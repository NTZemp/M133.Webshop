import React, { Component } from 'react';
import Product from '../../../../lib/products';
import ProductDetailViewState from './productDetailViewState';
import Price from '../price/price';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './productDetailView.style.css';

class ProductDetailView extends Component<RouteComponentProps, ProductDetailViewState> {

    constructor(props: Readonly<RouteComponentProps>){
        super(props);
        this.state = {product:new Product()}
        var path = this.props.location.pathname;
        let id:number = this.getIdFromPath(path);
        console.log(path);
        console.log(id);
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
                    <button  id="addToCart"><img className="icon" src="/assets/img/addToCart.svg"/></button>   
                </div>
            </div>
        )
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