class Organization < ApplicationRecord
  belongs_to :user
  has_many :employees
  has_many :users, through: :employees
end
