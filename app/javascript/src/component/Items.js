import React, {Component} from 'react';

import '../App.css';
import ItemCart from './ItemCart' 
import {connect} from 'react-redux' 




class Items extends Component {
    
    renderItems = () => {
        console.log('sort choice',this.props.sortChoice)
        console.log('search term',this.props.searchTerm)
        let itemTorender = this.props.items
            if (this.props.sortChoice ==='highest'){
                itemTorender = itemTorender.sort ((a,b) => 
                (a.price < b.price ? 1:-1))}

            if (this.props.sortChoice ==='lowest'){
                    itemTorender = itemTorender.sort ((a,b) => 
                    (a.price > b.price ? 1:-1))}
                    
            return itemTorender
            .filter(item => item.title.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
            .map(item => <ItemCart key={item.id} {...item} 
                DeleteItem={this.props.DeleteItem} />) 
    }
                
    

    render(){
        return (
            <div className="App topDiv">
                {this.renderItems()}
            </div>
        );
}
}

export default Items;


