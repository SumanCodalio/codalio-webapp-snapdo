# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_08_26_120000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["slug"], name: "index_organizations_on_slug", unique: true
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["slug"], name: "index_roles_on_slug", unique: true
  end

  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "status", default: "pending"
    t.datetime "due_at"
    t.datetime "completed_at"
    t.text "raw_transcript"
    t.string "source", default: "text"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["discarded_at"], name: "index_tasks_on_discarded_at"
    t.index ["organization_id"], name: "index_tasks_on_organization_id"
  end

  create_table "user_settings", force: :cascade do |t|
    t.string "theme", default: "oled_black"
    t.integer "font_scale", default: 100
    t.integer "haptic_intensity", default: 50
    t.integer "auto_archive_days", default: 30
    t.boolean "quick_add_shortcut_enabled", default: true
    t.boolean "sound_effects_enabled", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["organization_id"], name: "index_user_settings_on_organization_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "invitation_token"
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "api_token"
    t.json "permissions", default: []
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.index ["api_token"], name: "index_users_on_api_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["organization_id"], name: "index_users_on_organization_id"
  end

  create_table "users_role_invites", force: :cascade do |t|
    t.string "email"
    t.bigint "role_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_users_role_invites_on_organization_id"
    t.index ["role_id"], name: "index_users_role_invites_on_role_id"
  end

  create_table "users_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_users_roles_on_organization_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  create_table "voice_command_logs", force: :cascade do |t|
    t.string "provider"
    t.text "utterance"
    t.string "parsed_action"
    t.float "confidence"
    t.string "outcome", default: "success"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["organization_id"], name: "index_voice_command_logs_on_organization_id"
  end

  create_table "voice_integrations", force: :cascade do |t|
    t.string "provider"
    t.boolean "enabled", default: true
    t.string "shortcut_phrase"
    t.datetime "last_synced_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["organization_id"], name: "index_voice_integrations_on_organization_id"
  end

  add_foreign_key "tasks", "organizations"
  add_foreign_key "user_settings", "organizations"
  add_foreign_key "users", "organizations"
  add_foreign_key "users_role_invites", "organizations"
  add_foreign_key "users_role_invites", "roles"
  add_foreign_key "users_roles", "organizations"
  add_foreign_key "users_roles", "roles"
  add_foreign_key "users_roles", "users"
  add_foreign_key "voice_command_logs", "organizations"
  add_foreign_key "voice_integrations", "organizations"
end
