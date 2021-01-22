class CreateWorkWeeks < ActiveRecord::Migration[6.0]
  def change
    create_table :work_weeks do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :week, null: false, foreign_key: true

      t.timestamps
    end
  end
end
