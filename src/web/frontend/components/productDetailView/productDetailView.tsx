import React, { Component } from 'react';
import Product from '../../../../lib/product';
import AddProductRequest from  '../../../../lib/addProductRequest';
import ProductDetailViewState from './productDetailViewState';
import Price from '../price/price';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './productDetailView.style.css';
import ProductDetailViewProperties from './productDetailViewProperties';

class ProductDetailView extends Component<RouteComponentProps &ProductDetailViewProperties, ProductDetailViewState> {

    constructor(props: Readonly<RouteComponentProps &ProductDetailViewProperties>){
        super(props);
        this.state = {product:new Product()}
        var path = this.props.location.pathname;
        let id:number = this.getIdFromPath(path);
        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getProduct(id);
        
    }
    render() {
        var imgSource= "/assets/img/products/"+this.state.product.imageName;
        return (
            <div id="detailPageContainer">
                <div id="imageContainer">
                    <img id="image" src={imgSource}/>
                </div>
                <div id="contentContainer">
                    <h1>{this.state.product.name}</h1>
                    <div>{this.state.product.description}</div>
                    <Price price={this.state.product.price} specialPrice={this.state.product.specialPrice} />
                    <button onClick={this.handleChange} id="addToCart"><img className="icon" src="/assets/img/addToCart.svg"/></button>   
                </div>
            </div>
        )
    }

    handleChange(){
        this.addToCart();
        this.props.onCartChange();
    }

    addToCart(){
        var addProduct = new AddProductRequest(this.state.product.id);
        console.log(JSON.stringify(addProduct));
        fetch('/api/shoppingCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addProduct)
            })
        .then(res =>{
            if(res.ok){
                
            }
        })
    }

    getProduct(id:number){
        fetch("/api/products/"+ id)
        .then(res =>{
            return res.json();
        })
        .then(resProduct =>{
            this.setState({product:resProduct});
        })
        .catch(err =>{
            console.log(err);
        })
    }

    getIdFromPath(pathName: string):number{
        var urlPaths = pathName.split('/');
        return parseInt(urlPaths[urlPaths.length - 1]);
    }
}

export default withRouter(ProductDetailView);