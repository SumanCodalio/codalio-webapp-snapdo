# frozen_string_literal: true

module Scopes
  class VoiceCommandLogScope < Rhino::ResourceScope
    def apply(relation)
      relation
    end
  end
end
