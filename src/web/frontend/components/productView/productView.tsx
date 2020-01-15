import React, { Component } from 'react'
import { ProductViewProperties } from './ProductViewProperties'
import { Link } from 'react-router-dom';


import './productView.style.css';
import Price from '../price/price';

export default class ProductView extends Component<ProductViewProperties> {
    constructor(props: Readonly<ProductViewProperties>){
        super(props)
    }
    render() {
        let imgSource:string = "/assets/img/products/" + this.props.product.imageName;
        var productLink = "/products/" + this.props.product.id;

       
        return (
            <div id="productContainer">
                <Link id="link" to={productLink}>
                    <div id="productContentContainer">
                        <div id="pictureContainer">
                            <img id="productPicture" src={imgSource} alt="Product Picture"/>
                        </div>
                        <div id="informationContainer">
                            <h2 id="productName">{this.props.product.name}</h2>
                            <Price price={this.props.product.price} specialPrice={this.props.product.specialPrice}/>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
