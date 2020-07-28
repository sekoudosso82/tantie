import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import {LoginForm, SignupForm, Profile, Watchlist, AllSellings, AllPurchasedItems,  
        ShoppingCart, Currency} from './component'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchShopItemCreator } from './reducer'
import { fetchWatchlistCreator } from './reducer'
import { fetchOffersCreator } from './reducer'

import NavBar from './container/NavBar'
import ItemsContainer from './container/ItemsContainer.js'
import bp from './bp.jpg'

class  App extends Component {
  state = { 
    currentUser: null ,
    searchTerm: "",
    sortChoice: '',
  }

  componentDidMount(){
    const token = localStorage.token
    
    if(token){
      axios.get("api/v1/auto_login", {
        headers: { "Authorization": token }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response}) 
        } 
      })
    }
      this.props.fetchShopItems()
   
      this.props.fetchWatchlist()
   
      this.props.fetchOffers()
  }
   
  setUser = (response) => {
    console.log('response in app component', response)
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.token = response.token
      this.props.history.push("/items")
    })
  } 


  logout = () => {
    this.setState({ 
      currentUser: null
    }, () => { localStorage.removeItem('token')
              //  this.props.history.push('/login')
  })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    // console.log('this props history ' , this.props.history)
    // console.log('****app currentUser  ***' , this.state.currentUser)

  return (

    <>
        {/* <img src={bp} className='bp' alt='background pic'/> */}
        <NavBar fixed="top"  currentUser={this.state.currentUser} logout={this.logout}
          searchTerm={this.state.searchTerm} sortChoice={this.state.sortChoice}
          handleChange={this.handleChange}  />

        {this.state.currentUser ? 
        <div> 
        <Switch>
          <Route path="/items" render={routerProps => <ItemsContainer {...routerProps} 
                  currentUser={this.state.currentUser} searchTerm={this.state.searchTerm}
                  updateShopItem={this.updateShopItem} sortChoice={this.state.sortChoice}/>} />

          <Route path="/watchlist" render={() => <Watchlist currentUser={this.state.currentUser}/>}/>
          <Route path="/shoppingcart" render={() => <ShoppingCart currentUser={this.state.currentUser}  />}/>
      
          <Route path="/profile" render={routerProps => <Profile {...routerProps} currentUser={this.state.currentUser}/>}/>

          <Route path="/allsellings" component={AllSellings} />
          <Route path="/allparchaseditems " component={AllPurchasedItems} />
          
          <Route path="/currency" component={Currency} />
          
        </Switch>
        </div>
        : 
        <div>
            <h1 className="warning"> Please Login or SignUp  </h1>
          <Switch>
            <Route path="/signup" render={() => <SignupForm  setUser={this.setUser}/>}/>
            <Route path="/login" render={routerProps => <LoginForm {...routerProps} setUser={this.setUser}/>}/>
          </Switch>
        </div>
        }
    </>
  );
  }
}

function msp(state){
  return {
    shoppingCartItems: state.shoppingCartItems,
    shoppedItem: state.shoppedItem,
    shoppingcartId: state.shoppingcartId,
  }
}

const mdp = dispatch => {
  return {
    fetchShopItems: () => dispatch(fetchShopItemCreator()),
    fetchWatchlist:() => dispatch(fetchWatchlistCreator()),
    fetchOffers:() => dispatch(fetchOffersCreator()),
    
  }
}

export default connect(msp, mdp)(App);

