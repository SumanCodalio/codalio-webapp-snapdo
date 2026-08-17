# frozen_string_literal: true

class VoiceIntegration < Rhino::RhinoModel
  include Rhino::BelongsToOrganization

  rhino_filters :provider, :enabled, :shortcut_phrase, :last_synced_at
  rhino_sorts :provider, :enabled, :shortcut_phrase, :last_synced_at, :created_at
  rhino_fields :id, :provider, :enabled, :shortcut_phrase, :last_synced_at, :created_at
  validates :provider, length: { maximum: 255 }, allow_nil: true
  validates :enabled, inclusion: { in: [true, false] }, allow_nil: true
  validates :shortcut_phrase, length: { maximum: 255 }, allow_nil: true
end
