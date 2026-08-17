# frozen_string_literal: true

FactoryBot.define do
  factory :voice_integration do
    provider { Faker::Lorem.sentence(word_count: 3) }
    enabled { [true, false].sample }
    shortcut_phrase { Faker::Lorem.sentence(word_count: 3) }
    last_synced_at { Faker::Time.between(from: 1.year.ago, to: Time.current) }
  end
end
