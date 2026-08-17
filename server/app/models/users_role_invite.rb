class UsersRoleInvite < ApplicationRecord
  belongs_to :role
  belongs_to :organization
end
