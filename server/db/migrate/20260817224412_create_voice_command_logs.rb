# frozen_string_literal: true

class CreateVoiceCommandLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :voice_command_logs do |t|
      t.references :organization, foreign_key: true
      t.string :provider
      t.text :utterance, null: true
      t.string :parsed_action, null: true
      t.float :confidence, null: true
      t.string :outcome, default: "success"

      t.timestamps
    end
  end
end
