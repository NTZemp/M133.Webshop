import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import ShoppingCart from '../shoppingCart/shoppingCart'
import ProductList from '../productList/productList'
import Navigation from '../navigation/navigation'

import './app.style.css'
import Product from '../../../../lib/product'
import AppState from './AppState'
import AppProperties from './AppProperties'
import ProductDetailView from '../productDetailView/productDetailView'
import Branding from '../Branding/Branding'
import ShoppingCartPreview from '../shoppingCartPreview/shoppingCartPreview'

export default class app extends React.Component<AppProperties, AppState> {
  //https://www.freecodecamp.org/forum/t/returning-a-promise-value-from-fetch/200229/2
  constructor(props: Readonly<AppProperties>){
    super(props);
    this.state =  {products:[],totalPrice:0};
    this.getCurrentPrice  = this.getCurrentPrice.bind(this);
    
  }

  componentDidMount(){
    this.getProducts();
  }
//https://reactjs.org/docs/lifting-state-up.html
  render(){
    return (
    <div className='app-container'>
      <header>
        <ul >
          <li className='branding'>
              <Link to='/'>
                  <Branding/>
              </Link>
          </li>
          <li className='shoppingCartPreview'>
              <ShoppingCartPreview totalPriceInChf={this.state.totalPrice}/>
          </li>
        </ul>
      </header>
      <main>
        <Switch>
          <Route path='/' exact >
            <ProductList products={this.state.products}/>
          </Route>
          <Route path='/shoppingCart'>
            <ShoppingCart/>
          </Route>
          <Route path='/products/:id'>
            <ProductDetailView onCartChange={this.getCurrentPrice}/>
          </Route>
        </Switch>
      </main>
    </div>
    )
  }

  getCurrentPrice(){
    console.log('getCurrentPrice is run');
    fetch('/api/shoppingCart/totalPrice')
    .then(res =>{
        return res.json();
    })
    .then(obj =>{
        this.setState({totalPrice:obj.totalPrice});
    })
}

  getProducts(){
    var products = new Array();
    fetch('/api/products')
    .then(res =>{
      return res.json()
    })
    .then((resProducts:Product[]) => {
      this.setState({products: resProducts});
    })
    .catch(err => {
      console.log(JSON.stringify(err))
    });
    
  }
}
