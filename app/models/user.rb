class User < ApplicationRecord

    has_secure_password 
    validates :username, uniqueness: true
    # validates :username, uniqueness: { case_sensitive: false }
    validates :password, length: { in: 3..20 }

    # validates :username, uniqueness: {case_sensitive: false}

    has_one :shopping_cart, dependent: :destroy
    has_one :watchlist, dependent: :destroy

    has_many :items, dependent: :destroy
    has_many :offers, dependent: :destroy
    has_many :item_offers, through: :offers, class_name: "Item"

    
end
