import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ShoppingCart from '../shoppingCart/shoppingCart'
import ProductList from '../productList/productList'
import Navigation from '../navigation/navigation'

import './app.style.css'
import Product from '../../../../lib/products'
import AppState from './AppState'
import AppProperties from './AppProperties'
import ProductDetailView from '../productDetailView/productDetailView'

export default class app extends React.Component<AppProperties, AppState> {
  //https://www.freecodecamp.org/forum/t/returning-a-promise-value-from-fetch/200229/2
  constructor(props: Readonly<AppProperties>){
    super(props);
    this.state =  {products:[]};
  }

  componentDidMount(){
    this.getProducts();
  }

  render(){
    return (
    <div className='app-container'>
      <header>
        <Navigation/>
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
            <ProductDetailView/>
          </Route>
        </Switch>
      </main>
    </div>
    )
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
