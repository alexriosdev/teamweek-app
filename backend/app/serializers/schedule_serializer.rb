class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :date, :is_available, :start_time, :end_time
  has_one :employee
  has_one :work_week
end
