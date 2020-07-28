class Api::V1::ItemsController < ApplicationController
    # skip_before_action :authorized #, only: [:new, :create]
    def index
        items = Item.all  
        render json: items.to_json(
            :include => {
                :user => {:only => [:username]},
             },
            :except => [:updated_at, :created_at])
        # render json: items,
        #        include: [:user],
        #        except: [:updated_at, :created_at]

    end

    def show
        item = Item.find(params[:id])
        
        render json: item.to_json(
            :include => {
                :user => {:only => [:username]},
             },
            :except => [:updated_at, :created_at])
        
            # render json: item,
            # include: [:user],
            # except: [:updated_at, :created_at]
        
        
    end

    def create
        item = Item.create(item_params)
    
        render json: item
    end
      
    def update
        item = Item.find(params[:id])
    
        item.update(item_params)
    
        render json: item, except: [:updated_at, :created_at]
    end
    
    def destroy
        item = Item.find(params[:id])
    
        item.destroy
    
        render json: item
    end
    
      private
    
    def item_params
        params.require(:item).permit(:user_id, :title, :price, :category, :offer, :imgUrl)
    end
    
end
