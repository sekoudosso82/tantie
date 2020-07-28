class Api::V1::AuthController < ApplicationController
    #   skip_before_action :authorized, only: [ :login]

    def login
        user = User.find_by(username: params[:username])
    
        if user && user.authenticate(params[:password])
          token = encode_token(user.id)
          render json: {user: user, token:token}
        else
          render json: {errors: "Warnig case sensitive, try again!"}
        end
      end
    
      def auto_login
          # user = User.find_by(id: request.headers['Authorization'])
          if session_user
              render json: session_user
            else 
              render json: {errors: "no matched user!"}
            end
        
      end
end
