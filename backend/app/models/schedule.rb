class Schedule < ApplicationRecord
  belongs_to :calendar_date
  belongs_to :user
end
