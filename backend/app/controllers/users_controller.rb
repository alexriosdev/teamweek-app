class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  private

  # def user_params
  #   # params.permit(:username, :password, :password_confirmation)
  #   params.require(:user).permit(:username, :password)
  # end

end
