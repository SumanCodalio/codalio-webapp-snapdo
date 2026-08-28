class User < ApplicationRecord
  include Rhino::HasPermissions

  # Permissions an account gets on self-service signup. Referenced by the
  # seeder so the granted set has a single definition.
  END_USER_PERMISSIONS = [
    "tasks.destroy",
    "tasks.index",
    "tasks.show",
    "tasks.store",
    "tasks.update",
    "user_settings.index",
    "user_settings.show",
    "user_settings.store",
    "user_settings.update",
    "voice_command_logs.index",
    "voice_command_logs.show",
    "voice_command_logs.store",
    "voice_integrations.destroy",
    "voice_integrations.index",
    "voice_integrations.show",
    "voice_integrations.store",
    "voice_integrations.update"
  ].freeze

  has_secure_password

  belongs_to :organization, optional: true
  has_many :users_roles, dependent: :destroy
  has_many :organizations, through: :users_roles
  has_many :roles, through: :users_roles

  # Rhino's permission layer and policies look for `user_roles`; this app's
  # join model is UsersRole, so expose the association under both names.
  has_many :user_roles, class_name: "UsersRole"

  validates :email, presence: true, uniqueness: true

  # Rhino resolves a user's role from the organization carried on the request,
  # but these routes have no organization segment, so policies always asked for
  # the role with no organization and got none back — which made every
  # role-gated attribute list come back empty. Fall back to the organization
  # the user belongs to.
  def role_slug_for_validation(organization = nil)
    super(organization || self.organization)
  end
end
