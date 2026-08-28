# frozen_string_literal: true

# Creates the Solid Queue, Cache and Cable tables when they are missing.
#
# Rails 8 generates a production database.yml naming four databases and ships the secondary ones
# as schema files (db/queue_schema.rb and friends) rather than migrations, so db:migrate — which
# only builds the primary schema — never creates their tables. On Heroku all four point at the one
# attached database, and db:prepare treats each as already prepared because that database exists,
# so it skips them too. The app then boots, Solid Queue looks for solid_queue_recurring_tasks and
# exits, and the dyno crashes.
#
# db:schema:load is the wrong tool here: the schema files declare force: :cascade, so it drops and
# recreates the tables, which is why Rails guards it behind ProtectedEnvironmentError in
# production. Running it every release would discard queued jobs. Loading only what is absent is
# both idempotent and non-destructive — after the first deploy this is a few table_exists? checks.
namespace :solid do
  desc "Load the Solid Queue/Cache/Cable schemas for any whose tables do not exist yet"
  task load_missing_schemas: :environment do
    # One representative table per schema: if it is there, that schema has been loaded.
    { "queue" => :solid_queue_jobs, "cache" => :solid_cache_entries, "cable" => :solid_cable_messages }
      .each do |name, table|
        next if ActiveRecord::Base.connection.table_exists?(table)

        path = Rails.root.join("db", "#{name}_schema.rb")
        # A generated app that does not use one of these has no schema file for it.
        next unless File.exist?(path)

        puts "[solid] loading #{name} schema"
        load path
      end
  end
end
