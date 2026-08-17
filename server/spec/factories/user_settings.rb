# frozen_string_literal: true

FactoryBot.define do
  factory :user_setting do
    theme { Faker::Lorem.sentence(word_count: 3) }
    font_scale { Faker::Number.between(from: 1, to: 100) }
    haptic_intensity { Faker::Number.between(from: 1, to: 100) }
    auto_archive_days { Faker::Number.between(from: 1, to: 100) }
    quick_add_shortcut_enabled { [true, false].sample }
    sound_effects_enabled { [true, false].sample }
  end
end
