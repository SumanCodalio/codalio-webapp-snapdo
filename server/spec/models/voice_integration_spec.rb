# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'VoiceIntegration — CRUD & Permissions', type: :request do
  def create_user_with_permissions(permissions)
    create(:user, permissions: permissions)
  end

  def auth_headers(user)
    { 'Authorization' => "Bearer #{user.api_token}" }
  end

    context 'as end_user' do
      let(:user) { create_user_with_permissions(['voice_integrations.index', 'voice_integrations.show', 'voice_integrations.store', 'voice_integrations.update', 'voice_integrations.destroy']) }
      let(:record) { create(:voice_integration) }

      it 'can list voice_integrations' do
        get "/api/voice_integrations", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show voice_integrations' do
        get "/api/voice_integrations/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create voice_integrations' do
        post "/api/voice_integrations", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update voice_integrations' do
        put "/api/voice_integrations/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can delete voice_integrations' do
        delete "/api/voice_integrations/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end

    end

    context 'as admin' do
      let(:user) { create_user_with_permissions(['voice_integrations.index', 'voice_integrations.show', 'voice_integrations.store', 'voice_integrations.update', 'voice_integrations.destroy']) }
      let(:record) { create(:voice_integration) }

      it 'can list voice_integrations' do
        get "/api/voice_integrations", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show voice_integrations' do
        get "/api/voice_integrations/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create voice_integrations' do
        post "/api/voice_integrations", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update voice_integrations' do
        put "/api/voice_integrations/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can delete voice_integrations' do
        delete "/api/voice_integrations/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end

    end

end
