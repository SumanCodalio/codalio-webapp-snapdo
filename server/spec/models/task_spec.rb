# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Task — CRUD & Permissions', type: :request do
  def create_user_with_permissions(permissions)
    create(:user, permissions: permissions)
  end

  def auth_headers(user)
    { 'Authorization' => "Bearer #{user.api_token}" }
  end

    context 'as end_user' do
      let(:user) { create_user_with_permissions(['tasks.index', 'tasks.show', 'tasks.store', 'tasks.update', 'tasks.destroy']) }
      let(:record) { create(:task) }

      it 'can list tasks' do
        get "/api/tasks", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show tasks' do
        get "/api/tasks/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create tasks' do
        post "/api/tasks", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update tasks' do
        put "/api/tasks/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can delete tasks' do
        delete "/api/tasks/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end

    end

    context 'as admin' do
      let(:user) { create_user_with_permissions(['tasks.index', 'tasks.show', 'tasks.store', 'tasks.update', 'tasks.destroy']) }
      let(:record) { create(:task) }

      it 'can list tasks' do
        get "/api/tasks", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can show tasks' do
        get "/api/tasks/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can create tasks' do
        post "/api/tasks", headers: auth_headers(user)
        expect(response.status).not_to eq(403)
      end

      it 'can update tasks' do
        put "/api/tasks/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end

      it 'can delete tasks' do
        delete "/api/tasks/#{record.id}", headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end

    end

end
