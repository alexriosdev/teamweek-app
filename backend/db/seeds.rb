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

# start_date = Date.today
# end_date = Date.today + 6

start_date = Date.parse('2021-01-17') # YEAR-MONTH-DAY
end_date = start_date + 6

(start_date..end_date).each{ |date|
  CalendarDate.create(format_date: date.strftime("%m/%d/%Y"))
}

User.all.each{ |user|
  Schedule.create(
    calendar_date_id: CalendarDate.second.id,
    user_id: user.id,
    start_hour: Time.now.strftime("%I:%M %p"),
    end_hour: (Time.now + 2.hours).strftime("%I:%M %p")    
  )
  Schedule.create(
    calendar_date_id: CalendarDate.third.id,
    user_id: user.id,
    start_hour: Time.now.strftime("%I:%M %p"),
    end_hour: (Time.now + 4.hours).strftime("%I:%M %p")    
  )
  Schedule.create(
    calendar_date_id: CalendarDate.fourth.id,
    user_id: user.id,
    start_hour: Time.now.strftime("%I:%M %p"),
    end_hour: (Time.now + 6.hours).strftime("%I:%M %p")    
  )
  Schedule.create(
    calendar_date_id: CalendarDate.fifth.id,
    user_id: user.id,
    start_hour: Time.now.strftime("%I:%M %p"),
    end_hour: (Time.now + 8.hours).strftime("%I:%M %p")    
  )
}


