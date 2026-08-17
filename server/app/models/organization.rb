class Organization < ApplicationRecord
  has_many :users_roles, dependent: :destroy
  has_many :users, through: :users_roles
  has_many :roles, through: :users_roles

  def self.base_owner?
    true
  end
end
