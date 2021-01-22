class EmployeeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_many :schedules
  # has_one :organization
end
