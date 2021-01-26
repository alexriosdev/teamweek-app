Rails
  .application
  .routes
  .draw do
    post '/login', to: 'auth#login'
    post '/signup', to: 'auth#signup'
    post '/week_request', to: 'work_weeks#week_request'
    post '/create_schedules', to: 'schedules#create_schedules'
    resources :organizations
    resources :users
    resources :weeks
    resources :employees
    resources :work_weeks
    resources :schedules
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  end
