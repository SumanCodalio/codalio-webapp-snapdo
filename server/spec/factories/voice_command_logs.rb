# frozen_string_literal: true

FactoryBot.define do
  factory :voice_command_log do
    provider { Faker::Lorem.sentence(word_count: 3) }
    utterance { Faker::Lorem.paragraph }
    parsed_action { Faker::Lorem.sentence(word_count: 3) }
    confidence { Faker::Number.decimal(l_digits: 3, r_digits: 2) }
    outcome { Faker::Lorem.sentence(word_count: 3) }
  end
end
