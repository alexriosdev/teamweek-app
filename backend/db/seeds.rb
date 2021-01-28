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
u1 = User.create(
    admin: true,
    email: 'user@email.com',
    password: '123',
    first_name: 'Jon',
    last_name: 'Snow',
    phone_number: Faker::PhoneNumber.cell_phone,
    avatar: 'https://upload.wikimedia.org/wikipedia/en/3/30/Jon_Snow_Season_8.png'
)

u2 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Jim',
  last_name: 'Halpert',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://memegenerator.net/img/images/400x/14915835.jpg'
)

u3 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Pam',
  last_name: 'Beesly',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://i.pinimg.com/originals/f2/1d/ba/f21dbab3929c43a610d276ec88d72009.jpg'
)

u4 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Prison',
  last_name: 'Mike',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://www.seekpng.com/png/full/172-1726126_michael-scott-prison-prison-mike.png'
)

u5 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Dwight',
  last_name: 'Schrute',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://theofficeanalytics.files.wordpress.com/2017/11/dwight.jpeg?w=1200'
)

office_users = [u2, u3, u4, u5]

u6 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Spongebob',
  last_name: 'Squarepants',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg'
)

u7 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Patrick',
  last_name: 'Star',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://upload.wikimedia.org/wikipedia/en/3/33/Patrick_Star.svg'
)

u8 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Mr.',
  last_name: 'Krabs',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/04/Spongebob-Mr-Krabs.jpg'
)

u9 = User.create(
  email: Faker::Internet.email,
  password: '123',
  first_name: 'Squidward',
  last_name: 'Tentacles',
  phone_number: Faker::PhoneNumber.cell_phone,
  avatar: 'https://static.wikia.nocookie.net/spongebob/images/9/96/The_Two_Faces_of_Squidward_174.png'
)

krab_users = [u6, u7, u8, u9]

# Create Organization
o1 = Organization.create(
  name: 'Dunder Mifflin',
  location: Faker::Address.full_address,
  user_id: u1.id
)

o2 = Organization.create(
  name: 'Krusty Krab',
  location: Faker::Address.full_address,
  user_id: u1.id
)

# Create Week
week_1 = Date.parse('2021-01-24') # YEAR-MONTH-DAY
week_2 = Date.parse('2021-01-31') # YEAR-MONTH-DAY

Week.create(full_date: week_1.strftime('%m/%d/%Y'))

# Create Employee (Associate users & organization)
office_employees = []
office_users.each do |user|
  office_employees << Employee.create(organization_id: o1.id, user_id: user.id)
end

krab_employees = []
krab_users.each do |user|
  krab_employees << Employee.create(organization_id: o2.id, user_id: user.id)
end

# Create WorkWeek (Associate week & organization)
WorkWeek.create(week_id: o1.id, organization_id: o1.id)

WorkWeek.create(week_id: o1.id, organization_id: o2.id)

# Create Schedule for Each Employee
office_employees.each do |e|
  7.times do |d|
    Schedule.create(
      employee_id: e.id,
      work_week_id: WorkWeek.first.id,
      is_available: true,
      date: (week_1 + d).strftime('%m/%d/%Y'),
      # start_time: Time.now.strftime('%I:%M %p'),
      # end_time: (Time.now + 2.hours).strftime('%I:%M %p')
    )
  end
end

krab_employees.each do |e|
  7.times do |d|
    Schedule.create(
      employee_id: e.id,
      work_week_id: WorkWeek.second.id,
      is_available: true,
      date: (week_1 + d).strftime('%m/%d/%Y'),
      # start_time: Time.now.strftime('%I:%M %p'),
      # end_time: (Time.now + 2.hours).strftime('%I:%M %p')
    )
  end
end
