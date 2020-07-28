class Api::V1::WatchlistsController < ApplicationController
    def index
        watchlists = Watchlist.all  
        
        render json: watchlists.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :watchlist_items => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])

        # render json: watchlists,
        #        include: [:items],
        #        except: [:updated_at, :created_at]

    end

    def show
        watchlist = Watchlist.find(params[:id])
        render json: watchlist.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :watchlist_items => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
        # render json: watchlist,
        # include: [:item],
        # except: [:updated_at, :created_at]   
    end

    def create
        watchlist = Watchlist.create(watchlist_params)

        render json: watchlist.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :watchlist_items => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])

        # render json: watchlist
    end 
    def update
        watchlist = Watchlist.find(params[:id])
        watchlist.update(watchlist_params)

        render json: watchlist.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :watchlist_items => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])

        # render json: watchlist, except: [:updated_at, :created_at]
    end
    def destroy
        watchlist = Watchlist.find(params[:id])
        watchlist.destroy

        render json: watchlist.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :watchlist_items => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
            
        # render json: watchlist
    end
      private
    def watchlist_params
        params.require(:watchlist).permit(:user_id)
    end

end
