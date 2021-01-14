class MembershipsController < ApplicationController
  before_action :set_membership, only: :destroy

  def create
    @membership = Membership.new(membership_params)

    if @membership.save
      render json: @membership, status: :created, location: @membership
    else
      render json: @membership.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @membership.destroy
  end

  private

  def set_membership
    @membership = Membership.find(params[:id])
  end

  def membership_params
    params.require(:membership).permit(:organization_id, :user_id)
  end

end
