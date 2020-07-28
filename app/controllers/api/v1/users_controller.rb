class Api::V1::UsersController < ApplicationController
    #   skip_before_action :authorized, only: [ :create]


    def index
        # users = User.all.sort_by { |user| user.username } 
        users = User.all 
        render json: users, except: [:updated_at, :created_at]

        
        # users = User.all  
        # render json: users, 
        # include: [:posts],
        # except: [:updated_at, :created_at]
    end 

    def create
        # make a user uses the username and password
        user = User.new(
            username: params[:username],
            password: params[:password],
            # emial: params[:emial],
            # phone: params[:phone],
          )
      
          if user.save
            token = encode_token(user.id)
            render json: {user: user, token: token}
          else
            render json: {errors: user.errors.full_messages}
          end
        
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)

        render json: user, expect: [:updated_at, :created_at] 
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: user
    end

    private
    def user_params 
        params.permit(:username, :password, :email, :phone, :profileImage)
    end

end
