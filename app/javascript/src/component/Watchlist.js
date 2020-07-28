import React, {Component} from 'react';

import '../App.css';
import WatchlistItem from './WatchlistItem'
import {connect} from 'react-redux'
import { fetchWatchlistCreator } from '../reducer'




class Watchlist extends Component {
  
  renderWatchlistItems = () => {
        return this.props.watchlistItems
        .filter(item => item.watchlist_id === this.props.currentUser.id)
        .map(item => <WatchlistItem  key={item.id} {...item}  />            
            )  
  }
  
  render(){
    return (
      <div className="App">
                  {this.renderWatchlistItems()} 
      </div>
    );
}}  

function msp(state){
  return { 
    watchlistItems: state.watchlistItems,   
    
  }
} 

const mdp = dispatch => {
  return {
    fetchWatchlist: () => dispatch(fetchWatchlistCreator()),  
  }
}
 
export default connect(msp,mdp)(Watchlist);  

