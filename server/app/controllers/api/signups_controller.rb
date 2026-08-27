# frozen_string_literal: true

module Api
  # Self-service account creation. Rhino's own POST /api/auth/register only
  # accepts users who already hold an organization invitation token, which the
  # product's open signup form has no way to supply, so registration lives here
  # and returns the same { token, organization_slug } body as /api/auth/login.
  class SignupsController < ApplicationController
    def create
      user = User.new(
        name: params[:name],
        email: params[:email].to_s.strip,
        password: params[:password],
        password_confirmation: params[:password_confirmation],
        organization: default_organization,
        permissions: User::END_USER_PERMISSIONS
      )

      unless user.save
        return render json: { errors: user.errors.messages }, status: :unprocessable_entity
      end

      UsersRole.create!(user: user, role: end_user_role, organization: user.organization)

      user.update!(api_token: SecureRandom.hex(32))

      render json: { token: user.api_token, organization_slug: user.organization.slug }, status: :created
    end

    private

    def default_organization
      Organization.first || Organization.create!(name: "Default Organization", slug: "default")
    end

    def end_user_role
      Role.find_or_create_by!(name: "end_user") { |role| role.slug = "end_user" }
    end
  end
end
