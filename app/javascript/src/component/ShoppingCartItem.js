import React, {Component} from 'react'
import { withRouter } from "react-router";
import {connect} from 'react-redux'


class ShoppingCartItem extends Component {
  render(){
    console.log('delete from shoppingCart props id', this.props.id)             
      return (
        <div className="search-bar">
            <img  className = "img-fluid" src={this.props.item.imgUrl} />
            <p> {this.props.title} </p>
            <p> ${this.props.item.price} </p>
            <p> {this.props.item.location} </p>
            <p> {this.props.item.condition} </p>
            <button class="btn btn-danger" onClick={() => this.props.removeFromShoppingCart(this.props.id)}>revome</button>
            <br></br>
            <br></br>
        </div>
      )
  }
}

const mdp = dispatch => {
  return {
    removeFromShoppingCart: (id) => dispatch({type: 'REMOVE_FROM_SHOPPINGCART', 
                                         payload: {id}}),  
  }
}

export default withRouter(connect(null, mdp)(ShoppingCartItem))

