class Watchlist < ApplicationRecord
  belongs_to :user

  has_many :watchlist_items, dependent: :destroy
  has_many :items, through: :watchlist_items

end
