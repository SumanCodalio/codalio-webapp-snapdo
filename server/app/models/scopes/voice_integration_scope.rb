# frozen_string_literal: true

module Scopes
  class VoiceIntegrationScope < Rhino::ResourceScope
    def apply(relation)
      relation
    end
  end
end
