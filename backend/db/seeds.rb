# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"
require "date"

User.destroy_all
Organization.destroy_all
Membership.destroy_all
CalendarDate.destroy_all
Schedule.destroy_all

u1 = User.create(
  admin: true,
  email: "test@test.com",
  password: "123",
  first_name: "Jon",
  last_name: "Snow",
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: "https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png"
)

5.times {
  User.create(
    email: Faker::Internet.email,
    password: "123",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone_number: Faker::PhoneNumber.cell_phone,
    avatar: Faker::Avatar.image
  )
}

o1 = Organization.create(
  name: "Winterfell",
  user_id: u1.id
)

User.all.each{ |user|
  Membership.create(
    organization_id: o1.id,
    user_id: user.id
  )
}
  
d1 = CalendarDate.create(
  full_date: Date.today,
  day_of_weeK: Date.today.strftime("%A"),
  month_name: Date.today.strftime("%B"),
  year: Date.today.strftime("%Y")
)

User.all.each{ |user|
  Schedule.create(
    calendar_date_id: d1.id,
    user_id: user.id,
    start_hour: Time.now,
    end_hour: (Time.now + 3600)
  )
}


