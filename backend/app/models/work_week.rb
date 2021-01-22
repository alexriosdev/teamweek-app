class WorkWeek < ApplicationRecord
  belongs_to :organization
  belongs_to :week
  
  has_many :schedules
  has_many :employees, through: :schedules
end
