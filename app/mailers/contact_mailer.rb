class ContactMailer < ApplicationMailer
  default from: 'laurent.d.lefebvre@gmail.com'

  def contact_email(name, email, phone, message)
    @name = name
    @phone = phone
    @message = message
    @sender_email = email

    mail(
      to: 'laurent.d.lefebvre@gmail.com',
      bcc: email,
      subject: 'Message from Portfolio Website'
    ) do |format|
      format.html do
        render html: "<div style='font-family: Futura, sans-serif; background-color: rgb(0, 45, 40); color: rgba(0, 255, 210, 1.0); padding: 20px; border-radius: 10px;'>
                        <h2 style='color: rgba(0, 255, 210, 1.0);'>Thank you for sending me a message.</h2>
                        <p style='color: rgba(0, 210, 160, 1.0);'>I will review your message and respond promptly if needed.</p>
                        <hr style='border-color: rgba(0, 255, 210, 1.0);'>
                        <p><strong>Name:</strong> #{@name}</p>
                        <p><strong>Email:</strong> #{@sender_email}</p>
                        <p><strong>Phone:</strong> #{@phone}</p>
                        <p><strong>Message:</strong> #{@message}</p>
                        <hr style='border-color: rgba(0, 255, 210, 1.0);'>
                        <p style='color: rgba(0, 210, 160, 1.0);'>Best regards,</p>
                        <p style='color: rgba(0, 210, 160, 1.0);'>Laurent Lefebvre</p>
                      </div>".html_safe
      end
    end
  end
end
