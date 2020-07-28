import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import axios from 'axios'
class ProfileCart extends Component {
    state = {
        updateIsClicked: false,
        username: this.props.username,
        password: this.props.password,
        email: this.props.email,
        phone: this.props.phone,
        profileImage: this.props.profileImage
    }
    toggleUpdateIsClicked = () => {
        this.setState({ updateIsClicked: !this.state.updateIsClicked})
    }

    handleChange = (event) => {
        this.setState({
              [event.target.name]: event.target.value
        })
    }
  
    handleUpdateProfile = (event) => {
        event.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
            profileImage: this.state.profileImage
        }
        let id  = this.props.currentUser.id; 
        console.log(' profile id ', this.props.currentUser.id )             
        axios.patch(`/api/v1/users/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify(data)
        })
        .then(resp=>resp.json())
        .then(data =>  {
            console.log('updated profile id', data)
            this.props.updateProfile(data)})

        this.setState({ 
            updateIsClicked: false,
            username: this.props.username,
            password: this.props.password,
            email: this.props.email,
            phone: this.props.phone,
            profileImage: this.props.profileImage
                     }) 
    } 

    handleDelete = () => {
        let id  = this.props.currentUser.id; 
        console.log(' delete profile id ', this.props.currentUser.id )   
        axios.delete(`/api/v1/watchlists/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => { 
                console.log('delete watchlist id', data.id)
            
                axios.delete(`/api/v1/shopping_carts/${id}`, {
                method: "DELETE"
                })
                // .then(resp => resp.json())
                .then(data => { 
                    console.log('delete shoppingCart id', data.id)
                
                    axios.delete(`/api/v1/users/${id}`, {
                        method: "DELETE"
                    })
                    // .then(resp => resp.json())
                    .then(data => { 
                        console.log('delete user id', data.id)
                        this.props.deleteAccount(data)
                    })
                })
        
        })
    }
    
  render(){
      console.log(' ********** profile props history ********', this.props)
      return (
        <div className="search-bar">
            <img  className = "rounded mx-auto d-block profileImage" src={this.props.profileImage} />
            <p> username: {this.props.username} </p>
            <p> email: {this.props.email} </p>
            <p> phone: {this.props.phone} </p>
            <Link to="/signup">
                <button class="btn btn-danger" onClick={this.handleDelete}>Delete Account</button>
            </Link>
            <button class="btn btn-primary" onClick={this.toggleUpdateIsClicked}>Update Account</button>
            {this.state.updateIsClicked ? 
                <form  onSubmit={this.handleUpdateProfile}>
                    <br></br>
                    
                    <label>username</label>
                    <input type="text" name = "username" value = {this.state.username} 
                    onChange = {this.handleChange}/>
                    <br></br><br></br>

                    <label>password</label>
                    <input type="text" name = "password" value = {this.state.password} placeholder='ENTER NEW PASSWORD'
                    onChange = {this.handleChange}/>
                    <br></br><br></br>

                    <label>email</label>  
                    <input type="text" name ="email" value = {this.state.email} 
                    onChange = {this.handleChange}/>
                    <br></br><br></br>

                    <label>phone</label>  
                    <input type="text" name = "phone" value = {this.state.phone} 
                    onChange = {this.handleChange}/>
                    <br></br><br></br>

                    <label>profileImage</label>  
                    <input type="text" name = "profileImage" value = {this.state.profileImage} 
                    onChange = {this.handleChange}/>
                    <br></br><br></br>
                    <button type='Submit' value="Submit" class="btn btn-success">Update Profile</button>
                </form>
                    

            : null}

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

        </div>
      )
  }
}

const mdp = dispatch => {
    return {
        updateProfile: (data) => dispatch({type: "UPDATE_PROFILE", payload: (data) }), 
        deleteAccount: (data) => dispatch({type: "DELETE_ACCOUNT", payload: (data) }), 
    } 
}
   
export default withRouter(connect(null, mdp)(ProfileCart))