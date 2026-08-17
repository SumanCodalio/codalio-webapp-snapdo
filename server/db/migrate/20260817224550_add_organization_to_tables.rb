class AddOrganizationToTables < ActiveRecord::Migration[8.0]
  def change
    add_reference :tasks, :organization, foreign_key: true unless column_exists?(:tasks, :organization_id)
    add_reference :user_settings, :organization, foreign_key: true unless column_exists?(:user_settings, :organization_id)
    add_reference :voice_command_logs, :organization, foreign_key: true unless column_exists?(:voice_command_logs, :organization_id)
    add_reference :voice_integrations, :organization, foreign_key: true unless column_exists?(:voice_integrations, :organization_id)
  end
end
