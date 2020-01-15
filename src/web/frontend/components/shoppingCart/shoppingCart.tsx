import React, { Component } from "react";
import ShoppingCartProperties from "./shoppingCartProperties";
import ShoppingCartState from "./shoppingCartState";
import "./shoppingCart.css";
import { Link } from "react-router-dom";

export default class ShoppingCart extends Component<
  ShoppingCartProperties,
  ShoppingCartState
> {
  constructor(props: Readonly<ShoppingCartProperties>) {
    super(props);
  }

  render() {
    let tableData;
    tableData = (
      <tbody>
        {this.renderTableData()}
        {this.totalRow()}
      </tbody>
    );
    return (
      <div>
        {this.props.shoppingCart.items.length !== 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Einzelpreis in CHF</td>
                  <td></td>
                  <td>Menge</td>
                  <td></td>
                  <td>Total</td>
                </tr>
              </thead>
              {tableData}
            </table>
            <Link to="/checkout">Checkout</Link>
          </div>
        ) : (
          <div>No Items in shoppingcart</div>
        )}
      </div>
    );
  }

  totalRow() {
    return (
      <tr key={-99} id="total">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="right" id="totalPrice">
          {this.props.shoppingCart.getTotal()}
        </td>
      </tr>
    );
  }

  renderTableData() {
    if (this.props.shoppingCart.items.length == 0) {
      return;
    }
    return this.props.shoppingCart.items.map(item => {
      return (
        <tr key={item.product.id}>
          <td>{item.product.name}</td>
          <td>{item.product.getPrice()}</td>
          <td>
            <button onClick={() => this.props.addToCart(item.product.id)}>
              +
            </button>
          </td>
          <td>{item.count}</td>
          <td>
            <button onClick={() => this.props.removeFromCart(item.product.id)}>
              -
            </button>
          </td>
          <td align="right">{item.getTotal()}</td>
        </tr>
      );
    });
  }
}
