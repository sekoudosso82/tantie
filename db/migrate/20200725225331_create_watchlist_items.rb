class CreateWatchlistItems < ActiveRecord::Migration[6.0]
  def change
    create_table :watchlist_items do |t|
      t.belongs_to :item, null: false, foreign_key: true
      t.references :watchlist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
