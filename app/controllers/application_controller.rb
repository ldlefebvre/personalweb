class ApplicationController < ActionController::Base
  before_action :redirect_to_https_and_www

  private

  def redirect_to_https_and_www
    if request.host == 'laurentlefebvre.me'
      redirect_to "https://www.laurentlefebvre.me#{request.fullpath}", status: :moved_permanently
    end
  end
end
