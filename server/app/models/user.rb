class User < ApplicationRecord
  belongs_to :organization, optional: true
  has_many :users_roles, dependent: :destroy
  has_many :organizations, through: :users_roles
  has_many :roles, through: :users_roles
end
