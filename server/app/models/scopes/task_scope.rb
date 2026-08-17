# frozen_string_literal: true

module Scopes
  class TaskScope < Rhino::ResourceScope
    def apply(relation)
      relation
    end
  end
end
