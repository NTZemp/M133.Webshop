import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import Branding from '../Branding/Branding';
import ShoppingCartPreview from '../shoppingCartPreview/shoppingCartPreview';

import './navigation.css'

export class Navigation extends React.Component<RouteComponentProps> {

    constructor(props: Readonly<RouteComponentProps>){
        super(props)

    }
    render (){
        let shoppingCartPreview;
        if(!(this.props.location.pathname.endsWith("shoppingCart"))){
            shoppingCartPreview =    <li className='shoppingCartPreview'>
                                         <ShoppingCartPreview/>
                                     </li>
        }else{
           shoppingCartPreview =  <div></div>
        }
        return(
            <ul >
                <li className='branding'>
                    <Link to='/'>
                        <Branding/>
                    </Link>
                </li>
                {shoppingCartPreview}
            </ul>
        );
    }
}

export default withRouter(Navigation);