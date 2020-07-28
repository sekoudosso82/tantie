import React, {Component} from 'react';
import {connect} from 'react-redux' 
import {fetchOffersCreator} from '../reducer'
import '../App.css';
import Offer from "./Offer"

class Summary extends Component {
  
  renderSoldItems = () => {
        let itemTorender = this.props.items        
        return itemTorender
        .filter(item => item.user_id===this.props.currentUser.id)
        .map(item => 
              <div className="summarySoldDiv">
                    <img  className = "img-thumbnail" src={item.imgUrl} />
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <p>{item.condition}</p>
              </div>
            ) 
  }

  renderOffers = () => {
    
        let offerTorender = this.props.offers        
        return offerTorender
        .filter(offer => offer.item.user_id===this.props.currentUser.id)
        .map(offer => <Offer key={offer.id} offer={offer} />) 
  }

  DeleteOffer = (data) => {
      let newOffers = this.props.offers.filter(offer => offer.id !== data.id)
      this.setState({ offers: newOffers })   
  }

  render()
  {
    console.log('id of declined offer ******',this.props.declinedOffer)
    console.log('summary all items ******',this.props.items)
    return (
      <div className="App ">
        <div className='summaryDiv'>
            Selling Items
            {this.renderSoldItems()}
        </div>
        <div className='summaryDivOffers'>
            Offers 
            {this.renderOffers()} 
        </div>
      
      </div>
    );
  }
}
function msp(state){
  return { 
    offers: state.offers, 
    items: state.items 
       
  }
}

const mdp = dispatch => {
  return {
    fetchOffers: () => dispatch(fetchOffersCreator()) 
  }
}

export default connect(msp, mdp)(Summary);  

