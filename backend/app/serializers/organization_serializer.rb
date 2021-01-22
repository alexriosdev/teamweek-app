class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :users
  # has_one :user  # OWNER OF ORGANIZATION
end
