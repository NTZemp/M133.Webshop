import express, { json } from "express";
import path from "path";
import expressSession from "express-session";
import Product from "../lib/product";
import ShoppingCartModel from "../lib/shoppingCart";
import ProductRequest from "../lib/productRequest";
import bodyParser from "body-parser";
import session from "express-session";
import ShoppingCartItem from "../lib/shoppingCartItem";
import {
  parseProduct,
  parseShoppinCartItem,
  parseShoppinCart,
  parseOrder
} from "../lib/parsers";
var fs = require("fs");

var data = fs.readFileSync("products.json", "utf8");
var products: Product[] = JSON.parse(data);

const app = express();

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
  var shoppingCart: ShoppingCartModel = req.session!.shoppingCart;
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

app.post("/api/shoppingcart/checkout", jsonParser, (req, res) => {
  if (!req.session!.shoppingCart) {
    req.session!.shoppingCart = new ShoppingCartModel();
    res.sendStatus(400);
    return;
  }else if(!req.session!.shoppingCart.items){
    res.sendStatus(400);
    return;
  }
  var order = parseOrder(req.body);
  console.log(order);
  if (order.isValid()) {
    req.session!.shoppingCart = null;
    res.sendStatus(204);
    return;
  } else {
    res.sendStatus(400);
  }
});

app.post("/api/shoppingcart/items", jsonParser, (req, res) => {
  if (!req.session!.shoppingCart) {
    req.session!.shoppingCart = new ShoppingCartModel();
  }
  let newProduct: ProductRequest = req.body;
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

app.delete("/api/shoppingcart/items", jsonParser, (req, res) => {
  if (!req.session!.shoppingCart) {
    req.session!.shoppingCart = new ShoppingCartModel();
  }
  var product: ProductRequest = req.body;
  var shoppingCart: ShoppingCartModel = parseShoppinCart(
    req.session!.shoppingCart
  );
  try {
    shoppingCart.remove(product.id);
    req.session!.shoppingCart = shoppingCart;
    res.sendStatus(204);
  } catch (e) {
    res.write(e.message);
    res.sendStatus(400);
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
