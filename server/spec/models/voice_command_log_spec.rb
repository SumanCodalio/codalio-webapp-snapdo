# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'VoiceCommandLog — CRUD & Permissions', type: :request do
  def create_user_with_permissions(permissions)
    create(:user, permissions: permissions)
  end

  def auth_headers(user)
    { 'Authorization' => "Bearer #{user.api_token}" }
  end

    context 'as end_user' do
      let(:user) { create_user_with_permissions(['voice_command_logs.index', 'voice_command_logs.show', 'voice_command_logs.store']) }
      let(:record) { create(:voice_command_log) }

      it 'can list voice_command_logs' do
        get "/api/voice_command_logs", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show voice_command_logs' do
        get "/api/voice_command_logs/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create voice_command_logs' do
        post "/api/voice_command_logs", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'cannot update voice_command_logs' do
        put "/api/voice_command_logs/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:forbidden)
      end

      it 'cannot delete voice_command_logs' do
        delete "/api/voice_command_logs/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:forbidden)
      end

    end

    context 'as admin' do
      let(:user) { create_user_with_permissions(['voice_command_logs.index', 'voice_command_logs.show', 'voice_command_logs.store', 'voice_command_logs.update', 'voice_command_logs.destroy']) }
      let(:record) { create(:voice_command_log) }

      it 'can list voice_command_logs' do
        get "/api/voice_command_logs", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show voice_command_logs' do
        get "/api/voice_command_logs/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create voice_command_logs' do
        post "/api/voice_command_logs", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update voice_command_logs' do
        put "/api/voice_command_logs/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can delete voice_command_logs' do
        delete "/api/voice_command_logs/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end

    end

end
