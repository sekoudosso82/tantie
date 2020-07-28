import React, {Component} from 'react'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import axios from 'axios'
import '../App.css';
class ShowSingleItem extends Component{

    state = {
        targetItem: {},
        editItem: false,
        makeOffer: false,
        title: '',     
        price: '',
        location: '',   
        condition: '',
        category: '',   
        offer: false,
        imgUrl:''
    }
    toggleEditItem = () => {
        this.setState({ editItem: !this.state.editItem})
    }
    toggleMakeOffer = () => {
        this.setState({ makeOffer: !this.state.makeOffer})
    }
    componentDidMount(){
        let { id } = this.props.match.params;              
        axios.get(`/api/v1/items/${id}`)
        .then(res => res.json())
        .then(targetItem => this.setState({targetItem,
            title: targetItem.title,     
            price: targetItem.price,
            location: targetItem.location,   
            condition: targetItem.condition,
            category: targetItem.category,   
            imgUrl:targetItem.imgUrl
        }))
    }

    handleAddToCart = () => {
        console.log('this.props.match.params', this.props.match.params)
        let { id } = this.props.match.params; 
        let data = {
            shopping_cart_id: this.props.userId, 
            item_id: parseInt(id)
        } 
            console.log('shopping_cart_id', this.props.userId)
            console.log('item_id', parseInt(id))
          console.log('** shopping cart post', data)
          axios.post(`/api/v1/shopping_cart_items`, {
            method: 'Post',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify(data)
        })
        // .then(resp=>resp.json())
        .then(data =>  {
            if(data.errors){
                alert(data.errors)} 
            // else {
            //     alert('Successfully added to shopping cart')}
                console.log('GOT FROM BACKEND AFTER POST', data)
                this.props.updateShopItem(data)
        })  
    }
    handleAddToWatchlist = () => {
        let { id } = this.props.match.params; 
        let data = {
            watchlist_id: this.props.userId, 
            item_id: parseInt(id)
          } 
        console.log('watchlist_id', this.props.userId)
        console.log('item_id', parseInt(id))
        console.log('** watchlist post', data)
        axios.post("/api/v1/watchlist_items", {
            method: 'Post',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify(data)
        })
        // .then(resp=>resp.json())
        .then(data => {
            if(data.errors){
                alert(data.errors)} 
            // else {
            //     alert('Successfully added to watchlist')}
                this.props.addWatchlist(data)
        }) 
    }

    handleMakeOffer = (event) => {
        event.preventDefault()
        let { id } = this.props.match.params; 
        // console.log('********************************************************************')
        // console.log('offer props.match.params data id ', id)

        let data = {user_id: this.props.userId, 
                    item_id: parseInt(id),
                    amount: this.state.price
          } 
          console.log('offer  data  ', data)

          axios.post("/api/v1/offers", {
            method: 'Post',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify(data)
        })
        .then(resp=>resp.json())
        .then(data1 => {
            console.log('offer posted data ', data1)
            if(data1.errors){
                alert(data1.errors)} 
            // else {
            //     alert('Offer send Successfully')}
                this.props.addOffer(data1)

        }) 
        this.setState({targetItem: {},
            editItem: false,
            makeOffer: false,
            title: '',     
            price: '',
            location: '',   
            condition: '',
            category: '',   
            offer: false,
            imgUrl:''

        })
        this.props.history.push('/items')
    }

    
    handleDelete = () => {
        let { id } = this.props.match.params;              
        axios.delete(`/api/v1/items/${id}`, {
            method: "DELETE"
        })
        // .then(resp => resp.json())
        .then(data => { 
            console.log('delete data id', data.id)
            this.props.deleteItem(data)})
        
        this.props.history.push('/items')
    }
    
    handleChange = (event) => {
        this.setState({
              [event.target.name]: event.target.value
        })
      }

    handleEdit = (event) => {
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
        let { id } = this.props.match.params;              
        axios.patch(`/api/v1/items/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify(
                data
            )
        })
        .then(resp=>resp.json())
        .then(data =>  {this.props.updateItem(data)})

        this.setState({ targetItem: {} }) 
        this.props.history.push('/items')
    } 


    
    render(){
        let { id } = this.props.match.params;
        console.log('*** showSingleItem this.props.match.params', id)
        console.log('*** showSingleItem this.props.id ', this.props.id)
        console.log('*** this state targetItem user id', this.state.targetItem.user_id)
        
        return(
                <div className='singleItemMainDiv'>
                    <div onClick={() => this.props.history.goBack()} className="back-button">⬅️ Go Back ⬅️</div>
                    <img  className = "img-fluid" src={this.state.targetItem.imgUrl} />
                    <p>{this.state.targetItem.title}</p>
                    <p>${this.state.targetItem.price}</p>
                    <p>location: {this.state.targetItem.location}</p>
                    <p>condition: {this.state.targetItem.condition} </p>
                    {this.props.userId===this.state.targetItem.user_id ?
                        <div>
                            <button className ="btn btn-danger singleButtonSized" onClick={this.handleDelete}>Delete</button> 
                            <button className ="btn btn-warning singleButtonSized" onClick={this.toggleEditItem}>Edit</button>
                            {this.state.editItem ? 
                                <form  className="editItemForm " onSubmit={this.handleEdit}>
                                
                                    <div className="form-row editItemFormDiv">
                                            <input className="form-control " placeholder="title"
                                            type="text" name = "title" value = {this.state.title} 
                                            onChange = {this.handleChange}/>
                                        
                                            <input className="form-control " placeholder="Add  price"
                                            type="text" name = "price" value = {this.state.price} 
                                            onChange = {this.handleChange}/>
                    
                                            <input className="form-control " placeholder="Add  location"
                                            type="text" name = "location" value = {this.state.location} 
                                            onChange = {this.handleChange}/>
                                    
                                            <input className="form-control " placeholder="Add  condition"
                                            type="text" name = "condition" value = {this.state.condition} 
                                            onChange = {this.handleChange}/>
                        
                                            <input className="form-control " placeholder="Add category"
                                            type="text" name = "category" value = {this.state.category} 
                                            onChange = {this.handleChange}/>
                                            
                                            <input className="form-control " placeholder="accept offer yes/no"
                                            type="text" name = "offer" value = {this.state.offer} 
                                            onChange = {this.handleChange}/>
                                        
                                            <input className="form-control " placeholder="Add Image Url"
                                            type="text" name = "imgUrl" value = {this.state.imgUrl} 
                                            onChange = {this.handleChange}/>
                                        
                                            <button className ="btn btn-success singleButtonSized" type='Submit' value="Submit" >Update item</button>
                                        </div>
                                </form>
                            : null} 
                        </div>      
                    :
                        <div>

                            <button className ="btn btn-primary singleButtonSized" onClick={this.handleAddToCart}>Add to Cart</button>
                            <button className ="btn btn-success singleButtonSized" onClick={this.handleAddToWatchlist}>Add to Watchlist</button>
                            <button className ="btn btn-secondary singleButtonSized" onClick = {this.toggleMakeOffer}>Make Offer</button>
                            {this.state.makeOffer? 
                                <form  className="formLogin" onSubmit={this.handleMakeOffer}>
                                    <div className="form-row offerFormInput">
                                        <div> 
                                            <input className="form-control " placeholder="offer price"
                                                    type="text" name = "price" value = {this.state.price} 
                                                    onChange = {this.handleChange}/> 
                                            <button className ="btn btn-success singleButtonSized" type='Submit' value="Submit" >Send Offer</button>
                                        </div>
                                    </div>
                                </form>    
                                            
                            : null}
                        </div>
                    } 
                </div>                       
           
        )
    } 
}     



const mdp = dispatch => {
    return {
        updateShopItem: (data) => dispatch({type: "UPDATE_SHOPPINGCART", payload: (data) }), 
        deleteItem: (data) => dispatch({type: "DELETE_ITEM", payload: (data) }), 
        updateItem: (data) => dispatch({type: "UPDATE_ITEM", payload: (data) }), 
        
        addWatchlist: (data) => dispatch({type: "ADD_WATCHLIST", payload: (data) }),         
        addOffer: (data) => dispatch({type: "ADD_OFFER", payload: (data) }), 

    }
}

export default withRouter(connect(null, mdp)(ShowSingleItem));  
