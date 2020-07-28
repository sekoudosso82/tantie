import React, {Component} from 'react';
import '../App.css';
import ShoppingCartItem from './ShoppingCartItem'
import {connect} from 'react-redux'
import axios from 'axios' 
import { fetchShopItemCreator } from '../reducer'

class ShoppingCart extends Component {
  
  renderShoppingCartItems = () => {
    console.log('shoppingCart props********. shoppingCartItems in render', this.props.shoppingCartItems)
    
    return this.props.shoppingCartItems
    .filter(item => item.shopping_cart_id === this.props.currentUser.id)
    .map(item => <ShoppingCartItem  key={item.id} {...item} />            
    )
 
  }

  items = () => {
    return this.props.shoppingCartItems
    .filter(item => item.shopping_cart_id === this.props.currentUser.id)
    .length
  }
  subTotal = () => {
    console.log('_________shoppingCartItem  props--------------- ', this.props.shoppingCartItems)
    
      return this.props.shoppingCartItems
      .filter(item => item.shopping_cart_id === this.props.currentUser.id)
      .reduce((totalPrice,itemInShoppingCart) => totalPrice + itemInShoppingCart.item.price, 0)
  } 
  estimatedtaxxxx = () => {
    let summmm = this.props.shoppingCartItems
    return Math.max(summmm
    .filter(item => item.shopping_cart_id === this.props.currentUser.id)
    .reduce((totalPrice,item) => totalPrice + item.item.price, 0)
    *(0.07)).toFixed(2)
  } 
  totalToPay = () => {
    let summmm = this.props.shoppingCartItems
    return (
      ( summmm
        .filter(item => item.shopping_cart_id === this.props.currentUser.id)
        .reduce((totalPrice,item) => totalPrice + item.item.price, 0)
      )
      + 
      (
        summmm
        .filter(item => item.shopping_cart_id === this.props.currentUser.id)
        .reduce((totalPrice,item) => totalPrice + item.item.price, 0)
        *(0.07)
      )
    )
  }

  handleCheckout = () => {
    console.log('procede checkout')
    
    let emptyArr = this.props.shoppingCartItems
    .filter(item => item.shopping_cart_id === this.props.currentUser.id)
    
    for (let i = 0; i < emptyArr.length; i++) {
      axios.delete(`/api/v1/shopping_cart_items/${emptyArr[i].id}`, {
          method: "DELETE"
        })
        // .then(resp => resp.json())
        .then(data => {console.log(data) }) 
    }
    this.props.checkout();
  } 


  render(){ 
    console.log('shoppingCart props********. shoppingCartItems', this.props.shoppingCartItems)
    return (
      <div className="App ">
          <h1>Items in shoppingCart</h1>
          <div className="shopppingCardCardDiv">
              {this.renderShoppingCartItems()} 
          </div>
          <div className="shopppingCardCardDiv1">
            <div className="card text-white bg-primary mb-3 sticky-top" >
              <div className="card-header bg-transparent border-success">Go to checkout</div>
              <div className="card-body text-success checkoutDivBody  ">
                <p className="checkoutDivBodyP">Items           : {this.items()}</p>
                <p className="checkoutDivBodyP">Subtotal         : ${this.subTotal()}</p>
                <p className="checkoutDivBodyP">Shipping address: {this.props.currentUser.email}</p>
                <p className="checkoutDivBodyP">Estimated tax   :  ${this.estimatedtaxxxx()}</p>
              </div>
              <div className="card-footer bg-transparent border-success">Total : {this.totalToPay()}</div>
            </div>
              <br></br>
              <br></br>
              <button type="button" class="btn btn-info" onClick={this.handleCheckout}>Checkout</button>
          </div>
      </div>
    );
}}

function msp(state){
  return { 
    shoppingCartItems: state.shoppingCartItems, 
  }
}

const mdp = dispatch => {
  return {
    checkout:() => dispatch({type: 'CHECKOUT'})  
  }
}
export default connect(msp,mdp)(ShoppingCart);  

