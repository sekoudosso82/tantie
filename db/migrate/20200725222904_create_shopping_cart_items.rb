class CreateShoppingCartItems < ActiveRecord::Migration[6.0]
  def change
    create_table :shopping_cart_items do |t|
      t.belongs_to :shopping_cart, null: false, foreign_key: true
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
