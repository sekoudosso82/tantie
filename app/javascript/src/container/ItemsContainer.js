import React, {Component} from 'react';

import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import '../App.css';
import Items from '../component/Items';
import SellItem from '../component/SellItem';
import ShowSingleItem from '../component/ShowSingleItem';
import Summary from '../component/Summary';
import {connect} from 'react-redux' 
import {fetchItemCreator} from '../reducer'

class  ItemsContainer extends Component {
  
  componentDidMount(){
    this.props.fetchItems()
  } 

  render(){
    console.log('items container state: ', this.state)
    console.log('****item Container currentUser.id  ***' , this.props.currentUser.id)
    console.log('****item Container props.id  ***' , this.props.id)
      return (
        <div className="App">

        <Switch>
        <Route path='/items/summary' render={routerProps => 
            <Summary {...routerProps} 
              currentUser ={this.props.currentUser} 
            /> }
          />
          
        <Route path='/items/sell' render={routerProps => 
            <SellItem {...routerProps} addItem={this.addItem} userId={this.props.currentUser.id} /> }
          />
          <Route path='/items/:id' render={routerProps => 
            <ShowSingleItem {...routerProps} 
            userId={this.props.currentUser.id}

            />} 
          />

          <Route path='/items' render={routerProps => 
            <Items {...routerProps} 
            currentUser ={this.props.currentUser} 
            items={this.props.items} 
            searchTerm={this.props.searchTerm}
            sortChoice={this.props.sortChoice} 
            
            /> }
          />  
        </Switch>
        </div>
      );
  }
}

function msp(state){
  return { 
    items: state.items,     
  }
}

const mdp = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItemCreator()),
    addItem: () => dispatch({type: 'ADD_ITEM'}) ,
  }
}

export default connect(msp,mdp)(ItemsContainer);

