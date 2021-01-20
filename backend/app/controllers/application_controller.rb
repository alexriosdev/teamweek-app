class ApplicationController < ActionController::API
  # before_action :authorized

  def current_user
    token = request.headers['auth-key']
    begin
      payload = JWT.decode(token,'teamweek', true)
      user = User.find_by(id: payload[0]['user_id'])
    rescue JWT::VerificationError
      nil
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: { success: false, message: 'Please log in' }, status: :unauthorized unless logged_in?
  end

end
