import React from "react";
import { ProductListProperties } from "./ProductListPropserties";
import ProductView from "../productView/productView";

import "./productList.style.css";

export default class ProductList extends React.Component<
  ProductListProperties
> {
  constructor(props: any) {
    super(props);
  }
  render() {
    var products = this.props.products.map(function(d, i) {
      return <ProductView key={i} product={d} />;
    });

    return <div id="productsContainer">{products}</div>;
  }
}
