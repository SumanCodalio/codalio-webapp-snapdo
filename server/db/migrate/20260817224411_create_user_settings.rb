# frozen_string_literal: true

class CreateUserSettings < ActiveRecord::Migration[8.0]
  def change
    create_table :user_settings do |t|
      t.references :organization, foreign_key: true
      t.string :theme, default: "oled_black"
      t.integer :font_scale, default: 100
      t.integer :haptic_intensity, default: 50
      t.integer :auto_archive_days, default: 30
      t.boolean :quick_add_shortcut_enabled, default: true
      t.boolean :sound_effects_enabled, default: true

      t.timestamps
    end
  end
end
