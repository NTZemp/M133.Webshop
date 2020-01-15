import express, { json } from "express";
import path from "path";
import expressSession from "express-session";
import Product from "../lib/product";
import ShoppingCartModel from "../lib/shoppingCart";
import AddProductRequest from "../lib/addProductRequest";
import bodyParser from "body-parser";
import session from "express-session";
import ShoppingCartItem from "../lib/shoppingCartItem";
import {parseProduct, parseShoppinCartItem, parseShoppinCart } from '../lib/parsers';
var fs = require("fs");

var data = fs.readFileSync("products.json", "utf8");
var products: Product[] = JSON.parse(data);

const app = express();

const newShoppingCart = new ShoppingCartModel();


app.use("/assets", express.static(path.join(__dirname, "frontend")));
var jsonParser = bodyParser.json();

app.use(
  session({
    secret: "fmv8Z1Nx4W4EnHcT9Fuk",
    name: "page_views",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/shoppingCart/totalPrice", (req, res) => {
  if (!req.session!.shoppingCart) {
    req.session!.shoppingCart = new ShoppingCartModel();
  }
  var  shoppingCart:ShoppingCartModel = req.session!.shoppingCart;
  shoppingCart = parseShoppinCart(shoppingCart);
  let total = shoppingCart.getTotal();
  res.json({ totalPrice: total });
});

app.get("/api/products/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var product = products.find(x => x.id === id);
  if (product === null) {
    res.sendStatus(404);
  }

  res.json(product);
});

app.post("/api/shoppingcart", jsonParser, (req, res) => {
  if (!req.session!.shoppingCart) {
    req.session!.shoppingCart = new ShoppingCartModel();
  }
  let newProduct: AddProductRequest = req.body;
  console.log(newProduct);
  var product = products.find(product => product.id == newProduct.id);
  if (product) {
    let cart: ShoppingCartModel = req.session!.shoppingCart;
    cart = parseShoppinCart(cart);
    cart.add(product);
    req.session!.shoppingCart = cart;
    res.sendStatus(201);
  } else {
    res.sendStatus(404);
  }
});

app.get("/api/shoppingcart", (req, res) => {
  if (!req.session!.shoppingCart) {
    req.session!.shoppingCart = new ShoppingCartModel();
  }
  res.json(req.session!.shoppingCart);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve);
  });
};
