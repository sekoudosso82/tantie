class Item < ApplicationRecord
  belongs_to :user

  has_many :offers, dependent: :destroy
  has_many :offer_users, through: :offers, class_name: 'User'



  has_many :watchlist_items, dependent: :destroy
  has_many :watchlists, through: :watchlist_items

  has_many :shoppingCart_items, dependent: :destroy
  has_many :shoppingCarts, through: :shoppingCart_items

end
