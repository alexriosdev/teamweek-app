class User < ApplicationRecord

  has_many :memberships
  has_many :schedules

  # Allows admins to create users without adding password
  has_secure_password :validations => false
  
  validates :email, { presence: true, uniqueness: true}

end
