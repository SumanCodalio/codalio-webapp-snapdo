# frozen_string_literal: true

org = Organization.find_or_initialize_by(name: "Default Organization")
org.slug ||= "default"
org.save!

role_user = Role.find_or_initialize_by(name: "end_user")
role_user.slug ||= "end_user"
role_user.save!

role_admin = Role.find_or_initialize_by(name: "admin")
role_admin.slug ||= "admin"
role_admin.save!

user = User.find_or_initialize_by(email: "test@example.com")
user.name = "Test User"
user.password = "password"
user.invitation_token = nil
user.organization = org
user.permissions = ["*"]
user.save!

UsersRole.find_or_create_by!(user: user, role: role_user, organization: org)
UsersRole.find_or_create_by!(user: user, role: role_admin, organization: org)

Task.find_or_create_by!(title: "Sample Task", organization: org, status: "pending")

require_relative "seeds/user_permission_seeder"
