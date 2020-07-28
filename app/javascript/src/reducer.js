import axios from 'axios'
const initialState = {
    // app
    shoppedItems: [], shoppingcartId: null, shoppingCartItem: [],
    // currentUser: null, 
    searchTerm: "",
    sortChoice: '',
    //  items container 
    items: [],    
    // profil  
    users: [],  
    //shoppingCart     
    shoppingCartItems: [], 
    // targetUser: {posts: [] }, 
    countShoppingCartitems: null ,  
    // watchlist  
    watchlistItems: [],  
    // profilCart 
    updateIsClicked: false, deleteIsClicked: false,
    username: '', password: '',email: '', phone: '',
    profileImage: '',  
    // sellItems  
    title: '',price: '',location: '', condition: '', 
    category: '',offer: '', imgUrl: '', 
    // showSingleitem 
    targetItem: {}, editItem: false, makeOffer: false,
    title: '', price: '', location: '',   
    condition: '',category: '', offer: false, imgUrl:'',
    // summary  
    offers: [],  
    // declinedOffer: false 
    
}

export const fetchShopItemCreator = () => dispatch => {
    axios.get('/api/v1/shopping_cart_items')
    // .then(res => res.json())
    .then(shoppingCartItems => {
        dispatch({type: 'FETCH_SHOPITEM', payload: { shoppingCartItems }})
    })
} 

export const fetchItemCreator = () => dispatch => {
    axios.get('/api/v1/items')
    // .then(resp => resp.json())
    .then(items => {
        dispatch({type: 'FETCH_ITEMS', payload: { items }})
    })
} 
export const fetchOffersCreator = () => dispatch => {
    axios.get('/api/v1/offers')
    // .then(resp => resp.json())
    .then(offers => {
        dispatch({type: 'FETCH_OFFERS', payload: { offers }})
    })
}

export const fetchUsersCreator = () => dispatch => {
    axios.get('/api/v1/users')
    // .then(resp => resp.json())
    .then(users => {
        dispatch({type: 'FETCH_USERS', payload: { users }})
    })
}  

export const fetchWatchlistCreator = () => dispatch => {
    axios.get('/api/v1/watchlist_items')
    // .then(resp => resp.json())
    .then(watchlistItems => {
        dispatch({type: 'FETCH_WATCHLIST', payload: { watchlistItems }})
    })
}

function reducer (prevState=initialState, action){
    console.log('reducer shopItem number', prevState.shopItemNum)
    switch(action.type){
        // case "COUNTSHOPPINGCARTITEMS":
        //     return (prevState.shoppingCartItems)
           
        case 'FETCH_OFFERS':
            return {...prevState, offers: action.payload.offers}
               
        case 'DELETE_OFFER':
            return {...prevState, offers: [...prevState.offers.filter(offer => offer.id !== action.payload.id)]}    
        case "ADD_OFFER":
            return {...prevState, offers: [...prevState.offers, action.payload]}
            
                
        case 'FETCH_USERS':
            return {...prevState, users: action.payload.users}
        
        case 'UPDATE_PROFILE':
            return {...prevState, 
                    users: prevState.users.map(user => {
                        if (user.id===action.payload.id){
                            return action.payload
                        }else {
                            return user
                        }
                    })}

        case 'DELETE_ACCOUNT':
            return {...prevState, users: [...prevState.users.filter(user => user.id !== action.payload.id)]}    
                                 
        case 'FETCH_WATCHLIST':
            return {...prevState, watchlistItems: action.payload.watchlistItems}
        
        case "ADD_WATCHLIST":
                return {...prevState, watchlistItems: [...prevState.watchlistItems, action.payload]}
            
        case 'REMOVE_FROM_WATCHLIST':
            return {...prevState, watchlistItems: [...prevState.watchlistItems.filter(item => item.id !== action.payload.id)]}    
            
        case 'FETCH_SHOPITEM':
            console.log('fetch shopItem ', action.payload)
            return {...prevState, shoppingCartItems: action.payload.shoppingCartItems}
             
        case "UPDATE_SHOPPINGCART":
            console.log('update shoppingCart payload', action.payload )
            return {...prevState, shoppingCartItems: [...prevState.shoppingCartItems, action.payload]}
        case 'REMOVE_FROM_SHOPPINGCART':
            let id = action.payload.id
            console.log('delete from shoppingCart payload.id', action.payload.id )
            axios.get(`/api/v1/shopping_cart_items/${id}`, {
                  method: "DELETE"
                })
                .then(resp => resp.json())
                .then(data => { console.log('data delete from shoppingCart ',data) 
                }) 
            return {...prevState, shoppingCartItems: [...prevState.shoppingCartItems.filter(item => item.id !== action.payload.id)]}    
            
        case "CHECKOUT":
            console.log('in reducer ')
            return {...prevState, shoppingCartItems: []}
        
        case 'FETCH_ITEMS':
            return {...prevState, items: action.payload.items} 
        case 'UPDATE_ITEM_PRIE':
            return {...prevState, 
                    items: prevState.items.map(item => {
                        if (item.id===action.payload.id){
                            return action.payload
                        }else {
                            return item
                        }
                    })}
         
        case 'ADD_ITEM':
            console.log('add new items to shoppingCart', action.payload.items)
            return {...prevState, items: action.payload.items}
        
        case 'UPDATE_ITEM':
            return {...prevState, 
                items: prevState.items.map(item => {
                    if (item.id===action.payload.id){
                        return action.payload
                    }else {
                        return item
                    }
                })}

        case 'SELL_NEW_ITEM':
            return {...prevState, items: [...prevState.items, action.payload]}    
           
        case 'DELETE_ITEM':
            return {...prevState, items: [...prevState.items.filter(item => item.id !== action.payload.id)]}    
           
            
        default: 

            return prevState
        
    }
} 
export default reducer 
// console.log('reducer shoppingCartItems length ', prevState.shoppingCartItems.length.length)
// console.log('reducer shopItem number', prevState.shopItemNum)