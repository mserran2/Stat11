class SurveysController < ApplicationController
  layout :choose_layout
  # GET /surveys
  # GET /surveys.json
  def index
    @surveys = Survey.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @surveys }
    end
  end

  # GET /surveys/1
  # GET /surveys/1.json
  def show
    @survey = Survey.find(params[:id])
    @subs = @survey.subrecords

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @survey }
    end
  end

  # GET /surveys/new
  # GET /surveys/new.json
  def new
    @survey = Survey.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @survey }
    end
  end

  # GET /surveys/1/edit
  def edit
    #@survey = Survey.find(params[:id])
    render :text => "Sorry. Survey data cannot be edited."
  end

  # POST /surveys
  # POST /surveys.json
  def create
    @survey = Survey.new(params[:survey])
    puts params

    respond_to do |format|
      if @survey.save
        (1..Integer(params[:classnum])).each do |line|
          Subrecord.create(:survey_id => @survey.id, :division => params["radio#{line}"],
           :total_read => params["total_#{line}"], :complete_read => params["comp_#{line}"],
           :satisfaction => params["rating#{line}"])
        end
        format.html { redirect_to @survey, notice: 'You completed the survey. Thank you!' }
        format.json { render json: @survey, status: :created, location: @survey }
      else
        format.html { render action: "new" }
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /surveys/1
  # PUT /surveys/1.json
  def update
    render :text => "Sorry. Survey data cannot be changed."
=begin
    @survey = Survey.find(params[:id])

    respond_to do |format|
      if @survey.update_attributes(params[:survey])
        format.html { redirect_to @survey, notice: 'Survey was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
=end
  end

  # DELETE /surveys/1
  # DELETE /surveys/1.json
  def destroy
    render :text => "Sorry. Survey data definitely cannot be destroyed!"
=begin
    @survey = Survey.find(params[:id])
    @survey.destroy

    respond_to do |format|
      format.html { redirect_to surveys_url }
      format.json { head :ok }
    end
=end
  end
  
  def genTable
    if params[:id].present?
      @iter = params[:id]
      render "gentable.html.erb"
    end
  end
  
  def choose_layout    
    if ['genTable'].include? action_name
      'generator'
    else
      'application'
    end
  end
end
