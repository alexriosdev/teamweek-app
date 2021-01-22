class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.references :employee, null: false, foreign_key: true
      t.references :work_week, null: false, foreign_key: true
      t.string :date
      t.string :start_hour
      t.string :end_hour

      t.timestamps
    end
  end
end
