import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'

import '../App.css';
import logo from '../logo.svg';


class Offer extends Component {
  handleDelete = () => {
    let id  = this.props.offer.id;              
    axios.delete(`/api/v1/offers/${id}`, {
        method: "DELETE"
    })
    // .then(resp => resp.json())
    .then(data => { 
        console.log('delete data id', data.id)
        this.props.deleteOffer(data)
      })
    
  }
  handleAcceptOffer = () => {
    let id  = this.props.offer.item.id; 
    let id2  = this.props.offer.id;
    axios.patch(`/api/v1/items/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json",
                "Accept": "application/json"},    
      body: JSON.stringify({price:this.props.offer.amount})
    })
    // .then(resp => resp.json())
    .then(renderData => { 
            console.log('offer posted data ', renderData)
            if(renderData.errors){
                alert(renderData.errors)} 
            else {
                alert('Offer Successfully accepted')
                this.props.updateItemPrice(renderData)
                axios.delete(`/api/v1/offers/${id2}`, {
                    method: "DELETE"
                })
                .then(resp => resp.json())
                .then(data => { 
                    console.log('delete data id', data.id)
                    this.props.deleteOffer(data)
                  })
              }
      })  
  }

  render(){
  return (
    <div className="App">
      
      <div className="summarySoldDiv">
                    <img  className = "img-thumbnail" src={this.props.offer.item.imgUrl} />
                    <p>{this.props.offer.user.username}</p>
                    <p>offer price: ${this.props.offer.amount}</p>
                    <p>original price: ${this.props.offer.item.price}</p>
                    <button onClick={this.handleAcceptOffer} className ="btn btn-success singleButtonSized">Accept</button>
                    <button onClick={this.handleDelete} className ="btn btn-danger singleButtonSized">Decline</button>
                    
                    <br></br>
                    <br></br>
              </div>

    </div>
  );
}
}

const mdp = dispatch => {
  return {
    deleteOffer: (data) => dispatch({type: "DELETE_OFFER", 
                                         payload: (data)}),
    updateItemPrice: (data) => dispatch({type: "UPDATE_ITEM_PRIE", 
                                         payload: (data)}),                          
  }
}

export default connect(null,mdp)(Offer);


