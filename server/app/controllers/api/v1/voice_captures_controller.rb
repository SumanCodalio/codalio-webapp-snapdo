# frozen_string_literal: true

module Api
  module V1
    class VoiceCapturesController < ApplicationController
      skip_before_action :verify_authenticity_token, raise: false if respond_to?(:verify_authenticity_token)

      def create
        provider = params[:provider] || 'siri'
        text = params[:text] || params[:utterance] || params[:task_text]
        organization_id = params[:organization_id] || Organization.first&.id

        if text.blank?
          log_command(provider, text, 'create_task', 0.0, 'failed')
          render json: { error: 'Task text is required' }, status: :unprocessable_entity
          return
        end

        organization = Organization.find_by(id: organization_id) || Organization.first
        task = Task.create!(
          title: text,
          source: provider,
          status: 'pending',
          organization: organization
        )

        log_command(provider, text, 'create_task', 0.98, 'success')

        render json: {
          status: 'success',
          message: "Task created successfully",
          task: task
        }, status: :created
      rescue StandardError => e
        log_command(provider, text, 'create_task', 0.0, 'error')
        render json: { error: e.message }, status: :internal_server_error
      end

      private

      def log_command(provider, utterance, parsed_action, confidence, outcome)
        organization = Organization.find_by(id: params[:organization_id]) || Organization.first
        return unless organization

        VoiceCommandLog.create(
          provider: provider,
          utterance: utterance,
          parsed_action: parsed_action,
          confidence: confidence,
          outcome: outcome,
          organization: organization
        )
      rescue StandardError
        # Ensure log failures don't crash endpoint
      end
    end
  end
end
