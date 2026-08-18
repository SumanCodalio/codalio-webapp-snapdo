# frozen_string_literal: true

module Scopes
  class TaskScope < Rhino::ResourceScope
    # Enforces the 90-day archival policy noted in server/README.md: a
    # completed task drops out of every API listing 90 days after
    # completion, rather than remaining visible indefinitely.
    ARCHIVE_AFTER = 90.days

    def apply(relation)
      relation.where("completed_at IS NULL OR completed_at > ?", ARCHIVE_AFTER.ago)
    end
  end
end
