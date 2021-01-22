class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :avatar, :phone_number
end
