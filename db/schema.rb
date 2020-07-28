# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_25_225331) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "title"
    t.integer "price"
    t.string "category"
    t.boolean "offer"
    t.string "imgUrl"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "offers", force: :cascade do |t|
    t.integer "amount"
    t.bigint "item_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_offers_on_item_id"
    t.index ["user_id"], name: "index_offers_on_user_id"
  end

  create_table "shopping_cart_items", force: :cascade do |t|
    t.bigint "shopping_cart_id", null: false
    t.bigint "item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_shopping_cart_items_on_item_id"
    t.index ["shopping_cart_id"], name: "index_shopping_cart_items_on_shopping_cart_id"
  end

  create_table "shopping_carts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_shopping_carts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.bigint "phone"
    t.string "profileImage"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "watchlist_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "watchlist_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_watchlist_items_on_item_id"
    t.index ["watchlist_id"], name: "index_watchlist_items_on_watchlist_id"
  end

  create_table "watchlists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

  add_foreign_key "items", "users"
  add_foreign_key "offers", "items"
  add_foreign_key "offers", "users"
  add_foreign_key "shopping_cart_items", "items"
  add_foreign_key "shopping_cart_items", "shopping_carts"
  add_foreign_key "shopping_carts", "users"
  add_foreign_key "watchlist_items", "items"
  add_foreign_key "watchlist_items", "watchlists"
  add_foreign_key "watchlists", "users"
end
