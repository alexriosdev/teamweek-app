class Employee < ApplicationRecord
  belongs_to :organization
  belongs_to :user  
 
  has_many :schedules
end
