# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.references :organization, foreign_key: true
      t.text :description, null: true
      t.string :status, default: "pending"
      t.datetime :due_at, null: true
      t.datetime :completed_at, null: true
      t.text :raw_transcript, null: true
      t.string :source, default: "text"
      t.datetime :discarded_at
      t.index :discarded_at
      t.timestamps
    end
  end
end
