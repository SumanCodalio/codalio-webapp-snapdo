# frozen_string_literal: true

org = Organization.find_by(name: "Default Organization")
role_user = Role.find_by(name: "end_user")
role_admin = Role.find_by(name: "admin")

# End User
end_user = User.find_or_initialize_by(email: "end_user@demo.com")
end_user.name ||= "End User"
end_user.password = "password" if end_user.new_record?
end_user.organization = org
end_user.permissions = User::END_USER_PERMISSIONS
end_user.save!
UsersRole.find_or_create_by!(user: end_user, role: role_user, organization: org)

# Admin
admin = User.find_or_initialize_by(email: "admin@demo.com")
admin.name ||= "Admin User"
admin.password = "password" if admin.new_record?
admin.organization = org
admin.permissions = ["*"]
admin.save!
UsersRole.find_or_create_by!(user: admin, role: role_admin, organization: org)
