import React from 'react'

import './shoppingCartPreview.style.css';
import { render } from 'react-dom';



export default class ShoppingCartPreview extends React.Component {
    render(){
        return (
            <div className='shoppingCartPreviewContainer'>
                <img src='assets/img/shoppingCartPreview.svg' className='icon'/> 0.00
            </div>
        )
    }

    getCurrentPrice(): number{
        return 0;
    }
}
