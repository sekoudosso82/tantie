import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { SellItem, Watchlist, Summary , SearchBar, Currency, 
  FilterBar, ShoppingCart, UserController} from '../component'; 
import {connect} from 'react-redux'


function NavBar(props){
    console.log('nav bar prop shoppingCartItems length', props.shoppingCartItems.length)
    console.log('nav bar prop current user', props.currentUser)
  
  return (
   <div className=" navbar fixed-top navbar-dark bg-primary">
   
          <div className="navDiv"> 
          

          <Link to="/items"><div className="navCLass " >Home</div></Link>


          <Link to="/items/sell">
              <div className="navCLass">Sell</div>
          </Link>
          
          
        <div className="navCLassFilter "> 
            <FilterBar handleChange={props.handleChange} 
                       searchTerm={props.searchTerm}
                       sortChoice={props.sortChoice} /> 
        </div>
        <Link to="/watchlist">
            <div className="navCLass">
            { props.currentUser && props.watchlistItems.length > 0 ? 
                <span className="shopItemNum">
                    {props.watchlistItems
                     .filter(xxx => xxx.watchlist.user_id===props.currentUser.id)
                     .length}
                </span> 
                : null
            }
            watchlist 
            </div>
        </Link>

        <Link to="/shoppingcart">
            <div className="navCLass">
            { props.currentUser && props.shoppingCartItems.length > 0 ? 
                <span className="shopItemNum">
                    {props.shoppingCartItems
                     .filter(xxx => xxx.shopping_cart_id === props.currentUser.id)
                     .length}
                </span> 
                : null 
            }
             Shop 🛒</div>
        </Link>

        <Link to="/items/summary">
            <div className="navCLass">
            { props.currentUser && (props.offers.filter(xxx => xxx.item.user_id === props.currentUser.id)
                     .length) > 0 ? 
                     <div>
                        <span className="shopItemNum">
                            {props.offers
                            .filter(xxx => xxx.item.user_id === props.currentUser.id)
                            .length} </span> 
                         Offers 
                     </div>
                :<span> history </span> 
            }
                
            </div> 
        </Link>

        <Link to="/profile">
            <div className="navCLass">Profile</div>
        </Link>
          <div className="navBarLogin"> 
            <UserController  logout={props.logout} currentUser={props.currentUser} /> </div>

      </div>
      </div>
      
  )
}

function msp(state){
    return { 
        shoppingCartItems: state.shoppingCartItems,
        watchlistItems: state.watchlistItems,
        offers: state.offers
         
    }
}

export default connect(msp)(NavBar)
