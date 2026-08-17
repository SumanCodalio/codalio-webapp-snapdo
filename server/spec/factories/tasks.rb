# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { Faker::Lorem.sentence(word_count: 3) }
    description { Faker::Lorem.paragraph }
    status { Faker::Lorem.sentence(word_count: 3) }
    due_at { Faker::Time.between(from: 1.year.ago, to: Time.current) }
    completed_at { Faker::Time.between(from: 1.year.ago, to: Time.current) }
    raw_transcript { Faker::Lorem.paragraph }
    source { Faker::Lorem.sentence(word_count: 3) }
  end
end
