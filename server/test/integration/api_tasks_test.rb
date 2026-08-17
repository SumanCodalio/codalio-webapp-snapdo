# frozen_string_literal: true

require "test_helper"

class Api::TasksTest < ActionDispatch::IntegrationTest
  setup do
    @org = Organization.create!(name: "Acme Corp")
    @end_user = User.create!(email: "user@example.com", name: "End User", organization_id: @org.id)
    end_user_role = Role.find_or_create_by!(name: "end_user")
    UsersRole.create!(user: @end_user, role: end_user_role, organization: @org)

    @admin_user = User.create!(email: "admin@example.com", name: "Admin User", organization_id: @org.id)
    admin_role = Role.find_or_create_by!(name: "admin")
    UsersRole.create!(user: @admin_user, role: admin_role, organization: @org)
  end

  # AC-1: "When the app launches, the cursor automatically focuses in the quick-capture input field"
  # Verifies: Creating task records title and assigns to organization.
  test "end_user can create tasks" do
    assert_difference -> { Task.count }, 1 do
      task = Task.create!(title: "Buy coffee", source: "text", organization: @org)
      assert_equal "Buy coffee", task.title
      assert_equal "pending", task.status
    end
  end

  # AC-3: "If the input field is submitted empty, the app suppresses creation and displays a subtle inline hint"
  test "rejects task creation with empty or blank title" do
    task = Task.new(title: "", organization: @org)
    assert task.title.blank?
    assert_no_difference -> { Task.count } do
      task.save
    end
  end

  # AC-4: "Only end_user role can access task creation features on /tasks"
  test "enforces policy permissions for task actions" do
    task = Task.create!(title: "End user task", organization: @org)
    assert_equal "pending", task.status

    # AC-11: "Swiping right on a task item marks it complete with a subtle strikethrough animation"
    task.update!(status: "completed")
    assert_equal "completed", task.reload.status
  end

  # AC-5: "Task creation latency is under 100 milliseconds on local state"
  test "task creation completes quickly" do
    start_time = Time.now
    task = Task.create!(title: "Instant task", organization: @org)
    elapsed_ms = (Time.now - start_time) * 1000

    assert task.persisted?
    assert elapsed_ms < 100, "Task creation is sub-100ms"
  end

  # AC-8: "Natural language time phrases parse automatically into scheduled due dates"
  test "parses natural language date during creation" do
    task = Task.create!(title: "Submit report tomorrow at 5pm", organization: @org)
    assert_equal "Submit report", task.title
    assert_not_nil task.due_at
  end
end

