import express, { json } from "express";
import path from "path";
import expressSession from "express-session";
import Product from "../lib/products";
import session from "express-session";
var fs=require('fs');

var data=fs.readFileSync('products.json', 'utf8');
var products:Product[] =JSON.parse(data);

const app = express();

app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.use(session({
  "secret":"fmv8Z1Nx4W4EnHcT9Fuk"
}))


app.get('/api/products', (req,res)=>{
  res.json(products);
});

app.get('/api/products/:id', (req,res)=>{
  var id = parseInt(req.params.id);
  var product = products.find(x => x.id === id);
  if(product === null){
    res.sendStatus(404);
  }

  res.json(product);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve);
  });
};
