class CalendarDatesController < ApplicationController
  before_action :set_calendar_date, only: [:show, :update, :destroy]

  def index
    @calendar_dates = CalendarDate.all
    render json: @calendar_dates
  end

  def show
    render json: @calendar_date.to_json(
      include: [{ 
        schedules:  { except: [:created_at, :updated_at] },
      }]
    )
  end

  # Custom route to get all schedules from a date
  def date_request
    @calendar_date = CalendarDate.find_by(format_date: params[:format_date])
    render json: @calendar_date.to_json(
      include: [{ 
        schedules:  { except: [:created_at, :updated_at] },
      }],
      except: [:created_at, :updated_at] 
    )
  end

  private

  def set_calendar_date
    @calendar_date = CalendarDate.find(params[:id])
  end

  def calendar_date_params
    params.require(:calendar_date).permit(:format_date)
  end
  
  # def calendar_date_params
  #   params.require(:calendar_date).permit(:full_date, :day_of_week, :month_name, :year)
  # end
  
end
