class Api::V1::ShoppingCartItemsController < ApplicationController

    def index
        shoppingCartItems = ShoppingCartItem.all   
        # render json: shoppingCartItems,
        #        include: [:shopping_cart, :item],
        #        except: [:updated_at, :created_at]

        render json: shoppingCartItems.to_json(
            :include => {
            # :shopping_cart => {:only => [:id]},
            :item => { :only => [:title, :price, :location, :condition, :imgUrl ]},
            },
            :except => [:updated_at, :created_at])
    end

    def show
        shoppingCartItem = ShoppingCartItem.find(params[:id])
        
        render json: shoppingCartItem,
               include: [:shopping_cart, :item],
               except: [:updated_at, :created_at]  
    end

    def create
        shoppingCartItem = ShoppingCartItem.create(shoppingCartItem_params)
       
        render json: shoppingCartItem,
               include: [:shopping_cart, :item],
               except: [:updated_at, :created_at] 
    end
    # shopping_cart_id = params[:shopping_cart_id], 
    # item_id = params[:item_id]
      
    def update
        shoppingCartItem = ShoppingCartItem.find(params[:id])
        shoppingCartItem.update(shoppingCartItem_params)
        render json: shoppingCartItem, except: [:updated_at, :created_at]
    end
    
    def destroy
        shoppingCartItem = ShoppingCartItem.find(params[:id])
        shoppingCartItem.destroy
        render json: shoppingCartItem
    end
    
      private
    
    def shoppingCartItem_params
        params.permit(:shopping_cart_id, :item_id)
        # params.require(:shoppingCartItem).permit(:shopping_cart_id, :item_id)
    end

end
