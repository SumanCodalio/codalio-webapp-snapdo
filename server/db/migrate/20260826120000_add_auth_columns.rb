# frozen_string_literal: true

# The users table was created without the columns Rhino's auth stack reads:
# has_secure_password needs password_digest, token auth looks users up by
# api_token, and the permission layer reads users.permissions when a request
# carries no organization context. Login raised NoMethodError without them.
# Organizations and roles also need the slug both the login response and the
# policies' has_role? checks read back.
class AddAuthColumns < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :password_digest, :string
    add_column :users, :api_token, :string
    add_column :users, :permissions, :json, default: []
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_index :users, :email, unique: true
    add_index :users, :api_token, unique: true

    add_column :organizations, :slug, :string
    add_index :organizations, :slug, unique: true

    add_column :roles, :slug, :string
    add_index :roles, :slug, unique: true
  end
end
