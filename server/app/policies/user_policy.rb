# frozen_string_literal: true

class UserPolicy < Rhino::ResourcePolicy
  self.resource_slug = 'users'

  def show?
    true
  end

  def update?
    true
  end

  def permitted_attributes_for_show(user)
    ['*']
  end

  def permitted_attributes_for_update(user)
    ['*']
  end
end
