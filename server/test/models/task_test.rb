# frozen_string_literal: true

require "test_helper"

class TaskTest < ActiveSupport::TestCase
  setup do
    @org = Organization.create!(name: "Test Org")
  end

  # AC-1, AC-2, AC-3
  test "creates task with valid attributes and organization" do
    task = Task.create!(title: "Buy groceries", organization: @org)
    assert task.persisted?
    assert_equal "pending", task.status
    assert_equal @org, task.organization
  end

  # AC-8
  test "parses natural language date phrase in title" do
    task = Task.create!(title: "Call design lead today at 5pm", organization: @org)
    assert_equal "Call design lead", task.title
    assert_not_nil task.due_at
  end

  test "parses tomorrow morning natural language date" do
    task = Task.create!(title: "Review docs tomorrow morning", organization: @org)
    assert_equal "Review docs", task.title
    assert_not_nil task.due_at
  end
end
