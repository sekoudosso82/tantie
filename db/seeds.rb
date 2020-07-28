# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(username: 'Sekou', password: 'Sekou', 
    email:'sekou@gmail.com', phone: 646, 
    profileImage:'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/75242118_2573241079379472_2090702402230419456_n.jpg?_nc_cat=103&_nc_sid=110474&_nc_ohc=mZ6XCNeuc1UAX82oUwZ&_nc_ht=scontent-lga3-1.xx&oh=4d0b8e9604ef59508d702e051735f068&oe=5EC8385F')
# User.create(username: 'Ben', password: 'Ben', 
#     email:'ben@gmail.com', phone: 347,
#     profileImage:'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/12741994_10204184836740680_3136464450791401203_n.jpg?_nc_cat=104&_nc_sid=110474&_nc_ohc=mDboreBE-gEAX-bcNbx&_nc_ht=scontent-lga3-1.xx&oh=d6c8fe5c33811cfd90046b2a97e35acd&oe=5EC73AA5')


Item.create(
user_id: 1,
title: 'berluti',
price: 1000,
category: 'shoes',
offer: false,
imgUrl: 'https://www.berluti.com/dw/image/v2/BBMR_PRD/on/demandware.static/-/Sites-masterCatalog_Berluti/default/dwb1785f22/images/S3873-018_fast-track-torino-alligator-leather-sneaker_nero_berluti_01.jpg?sw=2000&sfrm=jpg'
)
# Item.create(
# user_id: 1,
# title: 'JM Weston',
# price: 1000,
# location: 'NYC',
# condition: 'used',
# category: 'shoes',
# offer: false,
# imgUrl: 'https://cdn.jmweston.com/media/catalog/product/cache/2/image/1903x862/9df78eab33525d08d6e5fb8d27136e95/w/e/we1131eyu2412ap.jpg'
# )

# Item.create(
# user_id: 1,
# title: 'John Lobb',
# price: 1500,
# location: 'NYC',
# condition: 'used',
# category: 'shoes',
# offer: true,
# imgUrl: 'https://thumbor-gc.tomandco.uk/unsafe/trim/1154x769/center/middle/smart/filters:upscale():fill(white):sharpen(0)/https://www.johnlobb.com/static/media/catalog/product/c/h/chapel_black_museum_calf__de_ail.jpg'
# )

ShoppingCart.create(
    user_id: 1, 
)
# ShoppingCart.create(
#     user_id: 2,   
# )

ShoppingCartItem.create(
    shopping_cart_id: 1,
    item_id: 1  
)
# ShoppingCartItem.create(
#     shopping_cart_id: 1,
#     item_id: 2  
# )


Watchlist.create(
    user_id: 1,   
)
# Watchlist.create(
#     user_id: 2,   
# )
WatchlistItem.create(
    watchlist_id: 1,
    item_id: 1  
)
# WatchlistItem.create(
#     watchlist_id: 1,
#     item_id: 3  
# )


Offer.create(
    user_id: 1,
    item_id: 1,
    amount: 500

)
# Offer.create(
#     user_id: 2,
#     item_id: 2,
#     amount: 500

# )



# 5.times do 
#     Item.create(
#         user_id: 1,
#         title: Faker::Name.unique.name,
#         price: Faker::Book.price,
#         location: Faker::Address.state,
#         condition: 'used'
#     )
# end            