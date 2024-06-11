Rails.application.routes.draw do
  root to: "pages#home"
  get 'aboutme', to: 'pages#aboutme'
  get 'project', to: 'pages#project'
  get 'contact', to: 'pages#contact'
  post 'contact', to: 'pages#send_contact_email'
  get "up" => "rails/health#show", as: :rails_health_check
end
