class CalendarDate < ApplicationRecord
  has_many :schedules
  has_many :users, through: :schedules
end
