class UsersRole < ApplicationRecord
  belongs_to :user
  belongs_to :role
  belongs_to :organization
end
