# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'date'

User.destroy_all
Organization.destroy_all
Week.destroy_all
Employee.destroy_all
WorkWeek.destroy_all
Schedule.destroy_all

# Create Users
u1 =
  User.create(
    admin: true,
    email: 'test@test.com',
    password: '123',
    first_name: 'Jon',
    last_name: 'Snow',
    phone_number: Faker::PhoneNumber.cell_phone,
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png'
  )

5.times do
  User.create(
    email: Faker::Internet.email,
    password: '123',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone_number: Faker::PhoneNumber.cell_phone,
    avatar: Faker::Avatar.image
  )
end

# Create Organization
o1 = Organization.create(name: 'Winterfell', user_id: u1.id)

# Create Week
week_1 = Date.parse('2021-01-17') # YEAR-MONTH-DAY
week_2 = Date.parse('2021-01-24') # YEAR-MONTH-DAY

Week.create(full_date: week_1.strftime('%m/%d/%Y'))

# Create Employee (Associate users & organization)
User.all.each do |user|
  Employee.create(organization_id: o1.id, user_id: user.id)
end

# Create WorkWeek (Associate week & organization)
WorkWeek.create(week_id: o1.id, organization_id: o1.id)


# Create Schedule for Each Employee
Employee.all.each do |e|
  7.times do |d|
    Schedule.create(
      employee_id: e.id,
      work_week_id: WorkWeek.first.id,
      date: (week_1 + d).strftime('%m/%d/%Y'),
      start_hour: Time.now.strftime('%I:%M %p'),
      end_hour: (Time.now + 2.hours).strftime('%I:%M %p')
    )
  end
end
