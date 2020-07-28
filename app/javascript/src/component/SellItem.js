import React, {Component} from 'react';

import { withRouter } from "react-router";
import {connect} from 'react-redux'
import axios from 'axios'
import '../App.css';



class SellItem extends Component {
  state = {
      title: '',price: '',location: '',
      condition: '', category: '',offer: '', 
      imgUrl: '',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
    let data = {
      user_id: this.props.userId, 
      title: this.state.title,
      price: this.state.price,
      location: this.state.location,
      condition: this.state.condition,
      category: this.state.category,
      offer: this.state.offer,
      imgUrl: this.state.imgUrl,
    }

    axios.post('/api/v1/items', {
        method: "POST",
        headers: {"Content-Type": "application/json",
        "Accept": "application/json"},    
        body: JSON.stringify(data)
    })

    // .then(resp=>resp.json())
    // .then(console.log)
    .then(data => { 
      
        console.log('new selling item ', data)
        if(data.errors){
            alert(data.errors)} 
        else {
            alert('new selling item add Successfully')}
        this.props.sellNewItem(data)
    })

    this.setState({
      title: '',price: '',location: '',
      condition: '', category: '',offer: false, imgUrl: '',
    })
    this.props.history.push('/items')
 }

    
  render(){
    console.log('****sell  item currentUser  ***' , this.props.userId)
    return (
        <form className='sellItemDiv' onSubmit={this.handleSubmit}>
            <div class="form-row">
              <div class="col">
                  <input className="form-control sellItemDivInput"  type="text" placeholder="Add title" name = "title" 
                  value = {this.state.title} onChange = {this.handleChange}/>
              </div>
              <div class="col">
                  <input className="form-control sellItemDivInput"  type="text" placeholder="Add  price" name = "price" 
                  value = {this.state.price} onChange = {this.handleChange}/>
              </div>
            </div>
          
            <div class="form-row">
                <div class="col">
                    <input className="form-control sellItemDivInput" type="text" placeholder="Add  location" name = "location" 
                    value = {this.state.location} onChange = {this.handleChange}/>
                </div>
                <div class="col">
                    <input className="form-control sellItemDivInput" type="text" placeholder="Add  condition" name = "condition" 
                    value = {this.state.condition} 
                    onChange = {this.handleChange}/>
                </div>
            </div>  

            <div class="form-row">
                <div class="col">
                    <input className="form-control sellItemDivInput" type="text" placeholder="Add category" name = "category" 
                    value = {this.state.category} onChange = {this.handleChange}/>
                </div>
                <div class="col">
                    <input className="form-control sellItemDivInput" type="text" placeholder="accept offer yes/no" name = "offer" 
                    value = {this.state.offer} onChange = {this.handleChange}/>
                </div>
            </div>  

            <div class="form-row">
                <div class="col">
                    <input className="form-control sellItemDivInput" type="text" placeholder="Add Image Url" name = "imgUrl" 
                    value = {this.state.imgUrl} onChange = {this.handleChange}/>
                </div>
                <div class="col">
                </div>
            </div>  

            <br></br>
            <br></br>
          
          <button type='Submit' value="Submit" class="btn btn-primary">Submit item</button>
        </form>
  );

}
}

const mdp = dispatch => {
  return {
    sellNewItem: (data) => dispatch({type: "SELL_NEW_ITEM", 
                                         payload: (data)})                         
  }
}

export default  withRouter(connect(null,mdp)(SellItem))


