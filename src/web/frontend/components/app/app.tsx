import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ShoppingCart from '../shoppingCart/shoppingCart'
import ProductList from '../productList/productList'
import Navigation from '../navigation/navigation'



export default function app():JSX.Element {
  return (
    <div>
      <header>
        <Navigation/>
      </header>
      <main>
        <Switch>
          <Route path='/' exact >
            <ProductList/>
          </Route>
          <Route path='/shoppingCart'>
            <ShoppingCart/>
          </Route>
        </Switch>
      </main>
    </div>
  )
}
