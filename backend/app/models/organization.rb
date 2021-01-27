class Organization < ApplicationRecord
  belongs_to :user
  has_many :employees, dependent: :destroy
  has_many :users, through: :employees
  has_many :work_weeks, dependent: :destroy
end
