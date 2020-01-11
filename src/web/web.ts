import express, { json } from "express";
import path from "path";
import expressSession from "express-session";
var fs=require('fs');

var data=fs.readFileSync('products.json', 'utf8');
var products =JSON.parse(data);

const app = express();

app.use("/assets", express.static(path.join(__dirname, "frontend")));


app.get('/api/products', (req,res)=>{
  res.json(products);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve);
  });
};
