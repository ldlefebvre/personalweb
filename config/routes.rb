Rails.application.routes.draw do
  root to: "pages#home"
  get 'education', to: 'pages#education'
  get 'experience', to: 'pages#experience'
  get 'contracts', to: 'pages#contracts'
  get 'contact', to: 'pages#contact'
  get "up" => "rails/health#show", as: :rails_health_check
end
