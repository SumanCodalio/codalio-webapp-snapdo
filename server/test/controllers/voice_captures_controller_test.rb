# frozen_string_literal: true

require "test_helper"

class VoiceCapturesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @org = Organization.create!(name: "Test Org")
  end

  # AC-9 & AC-10
  test "creates task from voice capture endpoint" do
    post "/api/v1/voice-capture", params: {
      provider: "siri",
      text: "Buy milk tomorrow at 5pm",
      organization_id: @org.id
    }

    assert_response :created
    json = JSON.parse(response.body)
    assert_equal "success", json["status"]
    assert_equal "Buy milk", json["task"]["title"]

    log = VoiceCommandLog.last
    assert_equal "siri", log.provider
    assert_equal "success", log.outcome
  end

  test "returns unprocessable entity when text is missing" do
    post "/api/v1/voice-capture", params: {
      provider: "assistant",
      organization_id: @org.id
    }

    assert_response :unprocessable_entity
    log = VoiceCommandLog.last
    assert_equal "failed", log.outcome
  end
end
