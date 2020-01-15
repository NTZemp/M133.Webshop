import React, { Component } from "react";
import PriceProperties from "./priceProperties";

import "./price.style.css";

export default class Price extends Component<PriceProperties> {
  render() {
    let price;
    if (this.props.specialPrice != null) {
      price = (
        <div>
          <div className="crossedOut">{this.props.price} CHF</div>
          <div className="price">{this.props.specialPrice} CHF</div>
        </div>
      );
    } else {
      price = (
        <div>
          <div className="price">{this.props.price} CHF</div>
        </div>
      );
    }
    return <div>{price}</div>;
  }
}
