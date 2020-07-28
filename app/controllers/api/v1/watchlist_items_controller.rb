class Api::V1::WatchlistItemsController < ApplicationController
    def index
        watchlistItems = WatchlistItem.all   
        # render json: watchlistItems,
        #        include: [:watchlist, :item],
        #        except: [:updated_at, :created_at]

        render json: watchlistItems.to_json(
            :include => {
                :item => {:except => [:updated_at, :created_at]},
                :watchlist => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
                                       
        # render json: watchlistItems.to_json(
        #     :include => {
        #     :item => { :only => [:title, :price, :location, :condition, :imgUrl ]},
        #     },
        #     :except => [:updated_at, :created_at])
    end

    def show
        watchlistItem = WatchlistItem.find(params[:id])
        render json: watchlistItem.to_json(
            :include => {
                :item => {:except => [:updated_at, :created_at]},
                :watchlist => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at]) 
    end

    def create
        watchlistItem = WatchlistItem.create(watchlistItem_params)
        render json: watchlistItem.to_json(
            :include => {
                :item => {:except => [:updated_at, :created_at]},
                :watchlist => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
    end
      
    def update
        watchlistItem = WatchlistItem.find(params[:id])
        watchlistItem.update(watchlistItem_params)
        render json: watchlistItem.to_json(
            :include => {
                :item => {:except => [:updated_at, :created_at]},
                :watchlist => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])    end
    
    def destroy
        watchlistItem = WatchlistItem.find(params[:id])
        watchlistItem.destroy
        render json: watchlistItem.to_json(
            :include => {
                :item => {:except => [:updated_at, :created_at]},
                :watchlist => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
    end
    
      private
    
    def watchlistItem_params
        params.permit(:watchlist_id, :item_id)
    end

end
