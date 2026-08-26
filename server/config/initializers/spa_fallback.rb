# frozen_string_literal: true

# The compiled React client is served from public/ by the same Rails process
# that serves the API. Static file serving covers /index.html and the hashed
# assets, but a deep link or a page refresh on a client-side route (say
# /portal/claims/42) matches no file and no Rails route, so it would 404 before
# the SPA router ever loads. Rewrite those requests to /index.html and let the
# client router resolve the path.
class SpaFallback
  # Anything the server owns must never be rewritten: the API, the health check
  # and engine-mounted paths have to keep returning their real responses
  # (including 404s, which the client relies on to detect missing records).
  SERVER_OWNED = %r{\A/(api|up|rails|cable)(/|\z)}

  def initialize(app, root:)
    @app = app
    @root = root
    @root_prefix = "#{root}/"
  end

  def call(env)
    env["PATH_INFO"] = "/index.html" if fallback?(env)

    @app.call(env)
  end

  private
    def fallback?(env)
      method = env["REQUEST_METHOD"]
      return false unless method == "GET" || method == "HEAD"

      path = env["PATH_INFO"].to_s
      return false if path.match?(SERVER_OWNED)
      # Only navigations get rewritten. An XHR or an image request that misses
      # should still 404 rather than receive a surprise HTML body.
      return false unless env["HTTP_ACCEPT"].to_s.include?("text/html")

      !static_file?(path)
    end

    # Traversal-safe existence check: resolve the candidate and confirm it is
    # still inside public/ before treating it as a real file.
    def static_file?(path)
      candidate = File.expand_path(File.join(@root, path))
      return false unless candidate.start_with?(@root_prefix)

      File.file?(candidate)
    end
end

Rails.application.configure do
  # api_only apps keep ActionDispatch::Static as long as the file server is on,
  # and this app now has a public/ worth serving.
  config.public_file_server.enabled = true

  # Insert ahead of Static so the rewritten path is served as an ordinary file.
  config.middleware.insert_before ActionDispatch::Static, SpaFallback, root: Rails.public_path.to_s
end
