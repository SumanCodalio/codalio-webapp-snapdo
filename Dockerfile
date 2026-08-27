# syntax=docker/dockerfile:1

# Production image for a Rhino v4 app (client/ + server/) on a container host.
# The React client is compiled here and served by Rails out of server/public, so
# the product runs as a single web process on one origin. That is what the
# generated client already expects: vite proxies /api only in development, and
# rack-cors is not enabled on the server.

ARG RUBY_VERSION=3.4.4
ARG NODE_VERSION=22

# ---------------------------------------------------------------------------
# Compile the React client
# ---------------------------------------------------------------------------
FROM docker.io/library/node:${NODE_VERSION}-slim AS client

WORKDIR /client

# Manifests first so editing src/ does not reinstall dependencies.
COPY client/package.json client/package-lock.json ./

# npm install, not npm ci: a generated lockfile can drift from package.json and
# npm ci hard-fails on drift, which would turn a cosmetic drift into a failed
# deploy. Same reasoning as USE_NPM_INSTALL on the buildpack path.
RUN npm install --no-audit --no-fund

COPY client/ ./
RUN npm run build

# ---------------------------------------------------------------------------
# Rails base
# ---------------------------------------------------------------------------
FROM docker.io/library/ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client && \
    ln -s /usr/lib/$(uname -m)-linux-gnu/libjemalloc.so.2 /usr/local/lib/libjemalloc.so && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    LD_PRELOAD="/usr/local/lib/libjemalloc.so"

# ---------------------------------------------------------------------------
# Install gems and precompile bootsnap
# ---------------------------------------------------------------------------
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libyaml-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Gemfile first, then vendor/, so an unrelated vendored file cannot invalidate
# the bundle install layer. Both must land before bundle install: a generated
# app may path-source gems out of vendor/.
COPY server/Gemfile server/Gemfile.lock ./
COPY server/vendor/ ./vendor/
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile -j 1 --gemfile

COPY server/ ./
RUN bundle exec bootsnap precompile -j 1 app/ lib/

# ---------------------------------------------------------------------------
# Runtime image
# ---------------------------------------------------------------------------
FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# The compiled SPA lands in public/ so ActionDispatch::Static serves it; the
# SpaFallback initializer rewrites client-side routes to index.html.
COPY --from=client /client/dist/ /rails/public/

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    mkdir -p log tmp storage && \
    chown -R rails:rails log tmp storage
USER 1000:1000

# The host assigns $PORT at runtime, so bind it here rather than baking a port in.
#
# Schema work runs at boot rather than in a separate release step: Render's free
# tier has no one-off jobs, so there is nowhere else to put it. All three are
# idempotent, so re-running them on every restart is safe — db:migrate is a
# no-op once applied, solid:load_missing_schemas only loads what is absent, and
# db:seed is written to be re-runnable.
CMD ["sh", "-c", "./bin/rails db:migrate solid:load_missing_schemas db:seed && ./bin/rails server -b 0.0.0.0 -p ${PORT:-3000}"]
