# frozen_string_literal: true

module NaturalLanguageDateParser
  extend ActiveSupport::Concern

  DATE_PATTERNS = [
    { pattern: /\btoday\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i, handler: :parse_today_at },
    { pattern: /\btomorrow\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i, handler: :parse_tomorrow_at },
    { pattern: /\btomorrow\s+morning\b/i, handler: -> { Time.current.tomorrow.beginning_of_day + 9.hours } },
    { pattern: /\btomorrow\s+afternoon\b/i, handler: -> { Time.current.tomorrow.beginning_of_day + 14.hours } },
    { pattern: /\btomorrow\s+evening\b/i, handler: -> { Time.current.tomorrow.beginning_of_day + 18.hours } },
    { pattern: /\btomorrow\b/i, handler: -> { Time.current.tomorrow.beginning_of_day + 9.hours } },
    { pattern: /\btoday\b/i, handler: -> { Time.current.end_of_day } }
  ].freeze

  included do
    before_validation :parse_natural_language_due_date
  end

  private

  def parse_natural_language_due_date
    return if title.blank? || due_at.present?

    DATE_PATTERNS.each do |entry|
      match = title.match(entry[:pattern])
      next unless match

      parsed_time = case entry[:handler]
                    when Symbol
                      send(entry[:handler], match)
                    when Proc
                      entry[:handler].call
                    end

      if parsed_time
        self.due_at = parsed_time
        # Clean title by removing the parsed date phrase
        self.title = title.gsub(entry[:pattern], '').strip.squeeze(' ')
        break
      end
    end
  end

  def parse_today_at(match)
    hour = match[1].to_i
    min = match[2] ? match[2].to_i : 0
    ampm = match[3]&.downcase

    hour += 12 if ampm == 'pm' && hour < 12
    hour = 0 if ampm == 'am' && hour == 12

    Time.current.change(hour: hour, min: min)
  end

  def parse_tomorrow_at(match)
    hour = match[1].to_i
    min = match[2] ? match[2].to_i : 0
    ampm = match[3]&.downcase

    hour += 12 if ampm == 'pm' && hour < 12
    hour = 0 if ampm == 'am' && hour == 12

    Time.current.tomorrow.change(hour: hour, min: min)
  end
end
