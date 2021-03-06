Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "articles#index"

  resources :articles do
    resource :likes, only: [:show, :create, :destroy]
  end

  resources :searchs
  resources :books
  resources :searcheds, only: [:index]
  resources :timelines, only: [:index]

  resources :accounts, only: [:show] do
    resources :follows, only: [:show, :create]
    resources :unfollows, only: [:create]
  end

  resource :profile
end
