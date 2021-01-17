class CreateCalendarDates < ActiveRecord::Migration[6.0]
  def change
    create_table :calendar_dates do |t|
      # t.datetime :full_date
      # t.string :day_of_weeK
      # t.string :month_name
      # t.string :year
      t.string :format_date

      t.timestamps
    end
  end
end
