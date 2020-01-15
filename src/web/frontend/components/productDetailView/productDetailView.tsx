import React, { Component } from "react";
import Product from "../../../../lib/product";
import ProductDetailViewState from "./productDetailViewState";
import Price from "../price/price";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import "./productDetailView.style.css";
import ProductDetailViewProperties from "./productDetailViewProperties";

class ProductDetailView extends Component<
  RouteComponentProps & ProductDetailViewProperties,
  ProductDetailViewState
> {
  constructor(
    props: Readonly<RouteComponentProps & ProductDetailViewProperties>
  ) {
    super(props);
    this.state = { product: new Product(), showToast: false, toastMessage: "" };
    var path = this.props.location.pathname;
    let id: number = this.getIdFromPath(path);
    //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
    this.handleChange = this.handleChange.bind(this);
    this.getProduct(id);
  }
  render() {
    var imgSource = "/assets/img/products/" + this.state.product.imageName;
    return (
      <div id="detailPageContainer">
        <div id="imageContainer">
          <img id="image" src={imgSource} />
        </div>
        <div id="contentContainer">
          <h1>{this.state.product.name}</h1>
          <div>{this.state.product.description}</div>
          <Price
            price={this.state.product.price}
            specialPrice={this.state.product.specialPrice}
          />
          <button onClick={this.handleChange} id="addToCart">
            <img className="icon" src="/assets/img/addToCart.svg" />
          </button>
        </div>
        <Toast
          show={this.state.showToast}
          onClose={() => {
            return this.setState({ showToast: false });
          }}
          autohide={true}
          delay={3000}
          animation={false}
        >
          <Toast.Body>{this.state.toastMessage}</Toast.Body>
        </Toast>
      </div>
    );
  }

  async handleChange() {
    if (await this.props.addToCart(this.state.product.id)) {
      this.setState({ toastMessage: "Added to Cart", showToast: true });
    } else {
      this.setState({
        toastMessage: "Couldn't add product to Cart",
        showToast: true
      });
    }
  }

  getProduct(id: number) {
    fetch("/api/products/" + id)
      .then(res => {
        return res.json();
      })
      .then(resProduct => {
        this.setState({ product: resProduct });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getIdFromPath(pathName: string): number {
    var urlPaths = pathName.split("/");
    return parseInt(urlPaths[urlPaths.length - 1]);
  }
}

export default withRouter(ProductDetailView);
