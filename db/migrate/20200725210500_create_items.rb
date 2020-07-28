class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :title
      t.integer :price
      t.string :category
      t.boolean :offer
      t.string :imgUrl
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
