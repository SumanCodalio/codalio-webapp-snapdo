# frozen_string_literal: true

org = Organization.find_or_create_by!(name: "Default Organization")

user = User.find_or_initialize_by(email: "test@example.com")
user.name = "Test User"
user.invitation_token = nil
user.organization = org
user.save!

role_user = Role.find_or_create_by!(name: "end_user")
role_admin = Role.find_or_create_by!(name: "admin")

UsersRole.find_or_create_by!(user: user, role: role_user, organization: org)
UsersRole.find_or_create_by!(user: user, role: role_admin, organization: org)

Task.find_or_create_by!(title: "Sample Task", organization: org, status: "pending")
