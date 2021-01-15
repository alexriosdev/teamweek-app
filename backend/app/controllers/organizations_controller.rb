class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :update, :destroy]

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    render json: @organization.to_json(
      include: [{ 
        users:        { except: [:created_at, :updated_at, :password_digest] },
        memberships:  { except: [:created_at, :updated_at] },
      }]
    )
  end

  private

  def set_organization
    @organization = Organization.find(params[:id])
  end

  def organization_params
    params.require(:organization).permit(:user_id)
  end

end
