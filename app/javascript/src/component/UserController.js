import React from 'react'
import { Link } from 'react-router-dom'

function UserController(props){
  return (
    <div className="user-controls">
      <button onClick={props.logout}>
        
          {props.currentUser ? 
            'Hi '+ props.currentUser.username +"-->LOG OUT":
            <div>
              <Link to="/login"><button className="login">LOG IN</button></Link>
              <Link to="/signup"><button className="signup">SIGN UP</button></Link>
            </div>
            
          }
        
      </button>
    </div>
  )
}
export default UserController

