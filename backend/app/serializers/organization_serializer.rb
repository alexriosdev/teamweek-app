class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :name, :location
  has_many :users
  # has_one :user  # OWNER OF ORGANIZATION
end
