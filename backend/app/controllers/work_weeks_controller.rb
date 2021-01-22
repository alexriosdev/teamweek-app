class WorkWeeksController < ApplicationController
  before_action :set_work_week, only: [:show, :update, :destroy]

  # GET /work_weeks
  def index
    @work_weeks = WorkWeek.all

    render json: @work_weeks
  end

  # GET /work_weeks/1
  def show
    render json: @work_week
  end

  # Custom route to get schedules for a specified week
  def week_request
    @week = Week.find_by(full_date: params[:full_date])
    if @week
      @work_week = WorkWeek.find_by(week_id: @week.id)
      render json: @work_week
    else
      render json: @work_week.errors, status: :unprocessable_entity
    end      
  end

  # POST /work_weeks
  def create
    @work_week = WorkWeek.new(work_week_params)

    if @work_week.save
      render json: @work_week, status: :created, location: @work_week
    else
      render json: @work_week.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /work_weeks/1
  def update
    if @work_week.update(work_week_params)
      render json: @work_week
    else
      render json: @work_week.errors, status: :unprocessable_entity
    end
  end

  # DELETE /work_weeks/1
  def destroy
    @work_week.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work_week
      @work_week = WorkWeek.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def work_week_params
      params.require(:work_week).permit(:organization_id, :week_id)
    end
end
