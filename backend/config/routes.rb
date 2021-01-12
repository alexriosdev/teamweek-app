Rails.application.routes.draw do
  resources :schedules
  resources :calendar_dates
  resources :memberships
  resources :organizations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
