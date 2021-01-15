class AuthController < ApplicationController 

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      payload = { user_id: @user.id }
      token = JWT.encode(payload, "teamweek")
      render json: { auth_key: token, user: @user }, status: :ok
    else
      render json: { error: "Login Failed" }, status: :unprocessable_entity
    end
  end

  def signup
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      payload = { user_id: @user.id }
      token = JWT.encode(payload, "teamweek")
      render json: { auth_key: token, user: @user }, status: :created
    else
      render json: { error: "Invalid User"}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :first_name, :last_name, :phone_number, :avatar, :password)
  end

end
