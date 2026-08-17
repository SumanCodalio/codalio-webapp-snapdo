# frozen_string_literal: true

class UserSetting < Rhino::RhinoModel
  include Rhino::BelongsToOrganization

  rhino_filters :theme, :font_scale, :haptic_intensity, :auto_archive_days, :quick_add_shortcut_enabled, :sound_effects_enabled
  rhino_sorts :theme, :font_scale, :haptic_intensity, :auto_archive_days, :quick_add_shortcut_enabled, :sound_effects_enabled, :created_at
  rhino_fields :id, :theme, :font_scale, :haptic_intensity, :auto_archive_days, :quick_add_shortcut_enabled, :sound_effects_enabled, :created_at
  validates :theme, length: { maximum: 255 }, allow_nil: true
  validates :font_scale, numericality: { only_integer: true }, allow_nil: true
  validates :haptic_intensity, numericality: { only_integer: true }, allow_nil: true
  validates :auto_archive_days, numericality: { only_integer: true }, allow_nil: true
  validates :quick_add_shortcut_enabled, inclusion: { in: [true, false] }, allow_nil: true
  validates :sound_effects_enabled, inclusion: { in: [true, false] }, allow_nil: true
end
