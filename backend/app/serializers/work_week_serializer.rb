class WorkWeekSerializer < ActiveModel::Serializer
  attributes :id, :week_schedule
  has_one :week
  # has_one :organization

  # Return Unique Employees & Their Schedules
  def week_schedule
    object.employees.uniq{|u| u.id}.map{|u|
      ::EmployeeSerializer.new(u, scope: scope, root: false, event: object)
    }
  end

end
