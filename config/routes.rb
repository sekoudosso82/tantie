# Rails.application.routes.draw do
  # root 'pages/index'
#   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
# end

Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      
      resources :watchlist_items
      resources :watchlists
  
      resources :items
  
      resources :shopping_carts
      resources :shopping_cart_items
  
      resources :offers
      
      resources :users
      post '/signup', to: "users#create"
      post "/login", to: "auth#login"
      get '/auto_login', to: 'auth#auto_login'
      
    end
  end
  get '*path', to: 'pages#index', via: :all
end
