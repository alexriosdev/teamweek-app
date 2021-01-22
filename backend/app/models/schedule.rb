class Schedule < ApplicationRecord
  belongs_to :employee
  belongs_to :work_week
end
