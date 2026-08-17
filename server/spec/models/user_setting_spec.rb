# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'UserSetting — CRUD & Permissions', type: :request do
  def create_user_with_permissions(permissions)
    create(:user, permissions: permissions)
  end

  def auth_headers(user)
    { 'Authorization' => "Bearer #{user.api_token}" }
  end

    context 'as end_user' do
      let(:user) { create_user_with_permissions(['user_settings.index', 'user_settings.show', 'user_settings.store', 'user_settings.update']) }
      let(:record) { create(:user_setting) }

      it 'can list user_settings' do
        get "/api/user_settings", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show user_settings' do
        get "/api/user_settings/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create user_settings' do
        post "/api/user_settings", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update user_settings' do
        put "/api/user_settings/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

    end

    context 'as admin' do
      let(:user) { create_user_with_permissions(['user_settings.index', 'user_settings.show', 'user_settings.store', 'user_settings.update']) }
      let(:record) { create(:user_setting) }

      it 'can list user_settings' do
        get "/api/user_settings", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show user_settings' do
        get "/api/user_settings/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create user_settings' do
        post "/api/user_settings", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update user_settings' do
        put "/api/user_settings/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

    end

end
