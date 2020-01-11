import React from 'react';
import {Link} from 'react-router-dom';
import Branding from '../Branding/Branding';
import ShoppingCartPreview from '../shoppingCartPreview/shoppingCartPreview';

import './navigation.css'

export default class Navigation extends React.Component {
    render (){
        return(
            <ul >
                <li className='branding'>
                    <Link to='/'>
                        <Branding/>
                    </Link>
                </li>
                <li className='shoppingCartPreview'>
                    <Link to='/shoppingCart'>
                        <ShoppingCartPreview/>
                    </Link>
                </li>
            </ul>
        );
    }
}
