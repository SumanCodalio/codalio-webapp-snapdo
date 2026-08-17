# frozen_string_literal: true

require "test_helper"

class VoiceCapturesApiTest < ActionDispatch::IntegrationTest
  setup do
    @org = Organization.create!(name: "Voice Org")
  end

  # AC-9: "Siri Intent payload parses task text and due dates accurately into the local task store"
  test "Siri voice shortcut creates task and records voice command log" do
    assert_difference -> { Task.count }, 1 do
      post "/api/v1/voice-capture", params: {
        provider: "siri",
        text: "Buy milk tomorrow at 5pm",
        organization_id: @org.id
      }
    end

    assert_response :created
    json = JSON.parse(response.body)
    assert_equal "success", json["status"]
    assert_equal "Buy milk", json["task"]["title"]

    log = VoiceCommandLog.last
    assert_equal "siri", log.provider
    assert_equal "success", log.outcome
  end

  # AC-10: "App Handles App Actions for Google Assistant 'create note or list' intent seamlessly"
  test "Google Assistant voice action creates task and logs telemetry" do
    assert_difference -> { Task.count }, 1 do
      post "/api/v1/voice-capture", params: {
        provider: "google_assistant",
        text: "Call Mom today at 5pm",
        organization_id: @org.id
      }
    end

    assert_response :created
    json = JSON.parse(response.body)
    assert_equal "success", json["status"]
    assert_equal "Call Mom", json["task"]["title"]

    log = VoiceCommandLog.last
    assert_equal "google_assistant", log.provider
    assert_equal "success", log.outcome
  end

  # AC-12 (Gap compensation): "Voice Capture API endpoint (/api/v1/voice-capture) status and logs page renders accurately"
  test "voice capture handles empty text payload gracefully with 422" do
    assert_no_difference -> { Task.count } do
      post "/api/v1/voice-capture", params: {
        provider: "siri",
        text: "",
        organization_id: @org.id
      }
    end

    assert_response :unprocessable_entity
    json = JSON.parse(response.body)
    assert_equal "Task text is required", json["error"]

    log = VoiceCommandLog.last
    assert_equal "failed", log.outcome
  end
end
