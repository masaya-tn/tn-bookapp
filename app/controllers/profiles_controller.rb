class ProfilesController < ApplicationController
  def show
    @profile = current_user.profile
    @articles = current_user.articles.order(created_at: :desc)
  end

  def edit
    @profile = current_user.prepare_profile
  end

  def update
    @profile = current_user.prepare_profile
    @profile.assign_attributes(profile_params)

    if @profile.save
      redirect_to profile_path, notice: 'プロフィール更新'
    else
      render :edit
    end
  end

  private
  def profile_params
    params.require(:profile).permit(
      :nickname,
      :introduction,
      :avatar
    )
  end
end
