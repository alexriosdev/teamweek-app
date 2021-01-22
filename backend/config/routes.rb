Rails
  .application
  .routes
  .draw do
    post '/login', to: 'auth#login'
    post '/signup', to: 'auth#signup'
    # post '/date_request', to: 'calendar_dates#date_request'
    post '/week_request', to: 'work_weeks#week_request'
    resources :organizations
    resources :users
    resources :weeks
    resources :employees
    resources :work_weeks
    resources :schedules
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  end
