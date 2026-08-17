# frozen_string_literal: true

class CreateVoiceIntegrations < ActiveRecord::Migration[8.0]
  def change
    create_table :voice_integrations do |t|
      t.references :organization, foreign_key: true
      t.string :provider
      t.boolean :enabled, default: true
      t.string :shortcut_phrase, null: true
      t.datetime :last_synced_at, null: true

      t.timestamps
    end
  end
end
