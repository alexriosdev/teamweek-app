class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_hour, :end_hour
  has_one :employee
  has_one :work_week
end
