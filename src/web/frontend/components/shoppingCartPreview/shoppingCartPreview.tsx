import React from 'react'

import './shoppingCartPreview.style.css';
import { Link } from 'react-router-dom';



export default class ShoppingCartPreview extends React.Component {
    render(){
        return (
            <div className='shoppingCartPreviewContainer'>
                <Link to='/shoppingCart'>
                    <img src='/assets/img/shoppingCartPreview.svg' className='icon'/> 0.00
                </Link>
            </div>
        )
    }

    componentDidUpdate(){
        
    }

    getCurrentPrice(): number{
        return 0;
    }
}
