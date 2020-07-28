class Api::V1::ShoppingCartsController < ApplicationController
    def index
        shoppingCarts = ShoppingCart.all  
        
        render json: shoppingCarts
        # ,
            #    include: [:item],
            #    except: [:updated_at, :created_at]

    end

    def show
        shoppingCart = ShoppingCart.find(params[:id])
        
        render json: shoppingCart,
        include: [:user, :item],
        except: [:updated_at, :created_at]
        
        
    end

    def create
        # ShoppingCart.create(user_id:3)
        shoppingCart = ShoppingCart.create(
            user_id: params[:user_id])
        
        render json: shoppingCart
    end
      
    def update
        shoppingCart = ShoppingCart.find(params[:id])
    
        shoppingCart.update(shoppingCart_params)
    
        render json: shoppingCart, except: [:updated_at, :created_at]
    end
    
    def destroy
        
        shoppingCart = ShoppingCart.find(params[:id])
    
        shoppingCart.destroy
    
        render json: shoppingCart
    end
    
      private
    
    def shoppingCart_params
        params.require(:shoppingCart).permit(:user_id)
    end

end
