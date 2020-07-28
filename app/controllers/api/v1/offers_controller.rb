class Api::V1::OffersController < ApplicationController
    def index
        offers = Offer.all  

        render json: offers.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :item => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
        
        

    end

    def show
        offer = Offer.find(params[:id])
        
        render json: offer.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :item => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
        
        
    end

    def create
        offer = Offer.create(offer_params)
        render json: offer.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :item => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
    end
      
    def update
        offer = Offer.find(params[:id])
    
        offer.update(offer_params)
    
        render json: offer.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :item => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])    end
    
    def destroy
        offer = Offer.find(params[:id])
    
        offer.destroy
    
        render json: offer.to_json(
            :include => {
                :user => {:except => [:updated_at, :created_at]},
                :item => {:except => [:updated_at, :created_at]}
             },
            :except => [:updated_at, :created_at])
    end
    
      private
    
    def offer_params
        params.require(:offer).permit(:user_id, :item_id, :amount)
    end


end
