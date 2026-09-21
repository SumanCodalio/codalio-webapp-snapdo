# frozen_string_literal: true


# End User
User.find_or_create_by!(email: 'end_user@demo.com') do |u|
  u.password = 'password'
  u.permissions = [
        'tasks.destroy',
        'tasks.index',
        'tasks.show',
        'tasks.store',
        'tasks.update',
        'user_settings.index',
        'user_settings.show',
        'user_settings.store',
        'user_settings.update',
        'voice_command_logs.index',
        'voice_command_logs.show',
        'voice_command_logs.store',
        'voice_integrations.destroy',
        'voice_integrations.index',
        'voice_integrations.show',
        'voice_integrations.store',
        'voice_integrations.update',
      ]
end

# Admin
User.find_or_create_by!(email: 'admin@demo.com') do |u|
  u.password = 'password'
  u.permissions = [
        'tasks.destroy',
        'tasks.index',
        'tasks.show',
        'tasks.store',
        'tasks.update',
        'user_settings.index',
        'user_settings.show',
        'user_settings.store',
        'user_settings.update',
        'voice_command_logs.destroy',
        'voice_command_logs.index',
        'voice_command_logs.show',
        'voice_command_logs.store',
        'voice_command_logs.update',
        'voice_integrations.destroy',
        'voice_integrations.index',
        'voice_integrations.show',
        'voice_integrations.store',
        'voice_integrations.update',
      ]
end
