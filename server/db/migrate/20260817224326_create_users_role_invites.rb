class CreateUsersRoleInvites < ActiveRecord::Migration[8.0]
  def change
    create_table :users_role_invites do |t|
      t.string :email
      t.references :role, null: false, foreign_key: true
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
