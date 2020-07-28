import React, {Component} from 'react'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import axios from 'axios'

class WatchlistItem extends Component {

  removeFromWatchlist = () => {
    axios.delete(`/api/v1/watchlist_items/${this.props.id}`, {
      method: "DELETE"
    })
    // .then(resp => resp.json())
    .then(data => { 
      this.props.removeItemFromWatchlist(data)
    })
  }
  render(){
    console.log('delete from watchlist props id', this.props.id)             
    // console.log('watchlist cartiem props', this.props.id)
      return (
        <div className="search-bar">
            <button class="btn btn-danger" onClick={this.removeFromWatchlist}>revome</button>
            <img  className = "img-fluid" src={this.props.item.imgUrl} />
            <p> {this.props.title} </p>
            <p> ${this.props.item.price} </p>
            <p> {this.props.item.location} </p>
            <p> {this.props.item.condition} </p>
        </div>
      )
  }
}

const mdp = dispatch => {
  return {
    removeItemFromWatchlist: (data) => dispatch({type: "REMOVE_FROM_WATCHLIST", 
                                         payload: (data)})
  }
}

export default withRouter(connect(null,mdp)(WatchlistItem))

