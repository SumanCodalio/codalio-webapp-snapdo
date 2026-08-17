# frozen_string_literal: true

module Scopes
  class UserSettingScope < Rhino::ResourceScope
    def apply(relation)
      relation
    end
  end
end
