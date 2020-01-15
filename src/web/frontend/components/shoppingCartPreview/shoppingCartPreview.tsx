import React from 'react'
import Cookies from 'universal-cookie';
import ShoppingCartPreviewState from './shoppingCartPreviewState';
import ShoppingCartPreviewProperties from './shoppingCartPreviewProperties';
import './shoppingCartPreview.style.css';
import { Link } from 'react-router-dom';



export default class ShoppingCartPreview extends React.Component<ShoppingCartPreviewProperties, ShoppingCartPreviewState> {
    
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <div className='shoppingCartPreviewContainer'>
                <Link to='/shoppingCart'>
                    <img src='/assets/img/shoppingCartPreview.svg' className='icon'/> {this.props.totalPriceInChf} CHF
                </Link>
            </div>
        )
    }    
}
