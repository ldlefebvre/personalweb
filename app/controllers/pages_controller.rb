class PagesController < ApplicationController
  def contact
    # This will render the contact form
  end

  def send_contact_email
    name = params[:name]
    email = params[:email]
    phone = params[:phone]
    message = params[:message]

    ContactMailer.contact_email(name, email, phone, message).deliver_now

    respond_to do |format|
      format.html { redirect_to contact_path, notice: 'Your message has been sent!' }
      format.turbo_stream { flash.now[:notice] = 'Your message has been sent!' }
    end
  end
end
