Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    post "signup", to: "signups#create"

    namespace :v1 do
      post "voice-capture", to: "voice_captures#create"
    end
  end
end
