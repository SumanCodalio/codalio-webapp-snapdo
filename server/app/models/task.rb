# frozen_string_literal: true

class Task < Rhino::RhinoModel
  include Rhino::BelongsToOrganization
  include Discard::Model
  include NaturalLanguageDateParser

  rhino_filters :title, :status, :due_at, :completed_at, :source
  rhino_sorts :title, :status, :due_at, :completed_at, :source, :created_at
  rhino_fields :id, :title, :description, :status, :due_at, :completed_at, :raw_transcript, :source, :created_at
  validates :title, presence: true, length: { maximum: 255 }, allow_nil: false
  validates :status, length: { maximum: 255 }, allow_nil: true
  validates :source, length: { maximum: 255 }, allow_nil: true
end
