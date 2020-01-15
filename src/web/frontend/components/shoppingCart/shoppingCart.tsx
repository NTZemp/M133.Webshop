import React, { Component } from 'react'
import ShoppingCartModel from '../../../../lib/shoppingCart';
import Product from '../../../../lib/product';
import ShoppingCartProperties from './shoppingCartProperties';
import ShoppingCartState from './shoppingCartState';
import Price from '../price/price';
import ShoppingCartItem from '../../../../lib/shoppingCartItem';

export default class ShoppingCart extends Component<ShoppingCartProperties,ShoppingCartState> {

    constructor(props:Readonly<ShoppingCartProperties>){
        super(props);
        var state = new ShoppingCartState();
        state.loading = false;
        state.shoppingCart = new ShoppingCartModel();
        this.state = state;
        this.refreshCart = this.refreshCart.bind(this);
        this.refreshCart();
    }

    render(){
        var getPrice = this.getPrice;
        let productsList;
       
        
        !this.state.loading ? (
            productsList = this.state.shoppingCart.getAllItems().map(function(p:ShoppingCartItem, i:number){
                return (
                    <tr key={i} >
                        <td>
                            {p.product.name}
                        </td>
                        <td>
                            <Price price={p.product.price} specialPrice={p.product.specialPrice}/>>
                        </td>
                        <td>
                            <button>
                                plus
                            </button>
                        </td>
                        <td>
                            {p.count}
                        </td>
                        <td>
                            <button>
                                Minus
                            </button>
                        </td>
                        <td>
                            {p.count * getPrice(p.product)}
                        </td>
                    </tr>
                )
            })): (
            productsList = <div>Loading</div>
          );
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>
                                Name
                            </td>
                            <td>
                                Einzelpreis
                            </td>
                            <td>
                            </td>
                            <td>
                                Menge
                            </td>
                            <td>
                            </td>
                            <td>
                                Total
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList}
                    </tbody>
                </table>
            </div>
        )
    }

    getPrice(product: Product){
        if(product.specialPrice != null) {
            return product.specialPrice;
        }
        return product.price;
    }    

    refreshCart(){
        fetch('/api/shoppingCart')
        .then(res => {
            return res.json();
        })
        .then(cart =>{
            this.setState({shoppingCart: cart});
        })
        .catch(err => {
            console.log(err);
        })
    }

}
