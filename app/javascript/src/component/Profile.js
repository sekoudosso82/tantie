import React, {Component} from 'react';
import ProfileCart from './ProfileCart'
import '../App.css';
import {connect} from 'react-redux'
import {fetchUsersCreator} from '../reducer'


class Profile extends Component {
  
  componentDidMount(){
    this.props.fetchUsers()
  } 
  renderProfile = () => {
        return this.props.users
        .filter(user => user.id === this.props.currentUser.id)
        .map(user => <ProfileCart  key={user.id} {...user} 
        currentUser={this.props.currentUser} />            
      )  
  }

  render(){
    return (
      <div className="App">
            {this.renderProfile()} 
      </div>
    );
}}

function msp(state){
  return { 
    users: state.users,     
  }
}  

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsersCreator()), 
  }
}
export default connect(msp,mdp)(Profile);

