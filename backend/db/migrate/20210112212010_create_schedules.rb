class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.references :calendar_date, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.time :start_hour
      t.time :end_hour

      t.timestamps
    end
  end
end
