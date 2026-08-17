# frozen_string_literal: true

# Rhino Configuration
# This file is used to configure Rhino for your Rails application.
# See: https://github.com/startsoft/rhino

Rhino.configure do |config|
  config.model :organizations, 'Organization'
  config.model :users, 'User'
  config.model :roles, 'Role'
  config.model :users_roles, 'UsersRole'
  config.model :users_role_invites, 'UsersRoleInvite'
  config.model :tasks, 'Task'
  config.model :user_settings, 'UserSetting'
  config.model :voice_command_logs, 'VoiceCommandLog'
  config.model :voice_integrations, 'VoiceIntegration'

  config.route_group :default, prefix: '', middleware: [], models: :all
end
