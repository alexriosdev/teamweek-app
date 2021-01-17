Rails.application.routes.draw do
  post '/login', to: 'auth#login'
  post '/signup', to: 'auth#signup'
  post '/date_request', to: 'calendar_dates#date_request'
  resources :schedules
  resources :calendar_dates
  resources :memberships
  resources :organizations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
