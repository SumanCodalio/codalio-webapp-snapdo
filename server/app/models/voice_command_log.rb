# frozen_string_literal: true

class VoiceCommandLog < Rhino::RhinoModel
  include Rhino::BelongsToOrganization

  rhino_filters :provider, :parsed_action, :confidence, :outcome
  rhino_sorts :provider, :parsed_action, :confidence, :outcome, :created_at
  rhino_fields :id, :provider, :utterance, :parsed_action, :confidence, :outcome, :created_at
  validates :provider, length: { maximum: 255 }, allow_nil: true
  validates :parsed_action, length: { maximum: 255 }, allow_nil: true
  validates :confidence, numericality: true, allow_nil: true
  validates :outcome, length: { maximum: 255 }, allow_nil: true
end
