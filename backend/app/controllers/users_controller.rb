class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user.to_json(    
      except: [:admin, :password, :created_at, :updated_at]
    )
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  # def user_params
  #   # params.permit(:username, :password, :password_confirmation)
  #   params.require(:user).permit(:username, :password)
  # end

end
