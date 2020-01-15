import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import ShoppingCart from "../shoppingCart/shoppingCart";
import ProductList from "../productList/productList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.style.css";
import Product from "../../../../lib/product";
import AppState from "./AppState";
import AppProperties from "./AppProperties";
import ProductDetailView from "../productDetailView/productDetailView";
import Branding from "../Branding/Branding";
import ShoppingCartPreview from "../shoppingCartPreview/shoppingCartPreview";
import { parseShoppinCart } from "../../../../lib/parsers";
import ShoppingCartModel from "../../../../lib/shoppingCart";
import ProductRequest from "../../../../lib/ProductRequest";
import Checkout from "../checkout/checkout";
import Toast from "react-bootstrap/Toast";

export default class app extends React.Component<AppProperties, AppState> {
  //https://www.freecodecamp.org/forum/t/returning-a-promise-value-from-fetch/200229/2
  constructor(props: Readonly<AppProperties>) {
    super(props);
    this.state = {
      products: new Array<Product>(),
      shoppinCart: new ShoppingCartModel(),
      showToast: false,
      toastMessage: ""
    };
    this.refreshShoppingCart = this.refreshShoppingCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.refreshShoppingCart();
  }

  componentDidMount() {
    this.getProducts();
  }
  //https://reactjs.org/docs/lifting-state-up.html
  render() {
    return (
      <div className="app-container">
        <header>
          <ul>
            <li className="branding">
              <Link to="/">
                <Branding />
              </Link>
            </li>
            <li className="shoppingCartPreview">
              <ShoppingCartPreview
                totalPriceInChf={this.state.shoppinCart.getTotal()}
              />
            </li>
          </ul>
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <ProductList products={this.state.products} />
            </Route>
            <Route path="/shoppingCart">
              <ShoppingCart
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                shoppingCart={this.state.shoppinCart}
              />
            </Route>
            <Route path="/products/:id">
              <ProductDetailView addToCart={this.addToCart} />
            </Route>
            <Route path="/checkout">
              <Checkout onCartChange={this.refreshShoppingCart} />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }

  async removeFromCart(id: number) {
    var productToDelete = new ProductRequest(id);
    await fetch("/api/shoppingcart/items", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productToDelete)
    })
      .then(async res => {
        if (res.ok) {
          await this.refreshShoppingCart();
        }
      })
      .catch(err => console.error(err));
  }

  async addToCart(id: number): Promise<boolean> {
    var addProduct = new ProductRequest(id);
    let response: Response;
    await fetch("/api/shoppingCart/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addProduct)
    })
      .then(res => {
        response = res;
      })
      .catch(err => console.error(err));
    if (response!.ok) {
      await this.refreshShoppingCart();
    }
    return response!.ok;
  }

  async getCurrentPrice() {}

  async refreshShoppingCart() {
    await fetch("/api/shoppingCart")
      .then(res => {
        return res.json();
      })
      .then(obj => {
        var cart = parseShoppinCart(obj);
        this.setState({ shoppinCart: cart });
      });
  }

  getProducts() {
    fetch("/api/products")
      .then(res => {
        return res.json();
      })
      .then((resProducts: Product[]) => {
        this.setState({ products: resProducts });
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }
}
