class User < ApplicationRecord
  has_many :memberships
  has_many :schedules

  has_secure_password
  
  validates :email, { presence: true, uniqueness: true}
end
