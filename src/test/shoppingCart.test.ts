import { expect } from 'chai';
import ShoppinCartModel from '../lib/shoppingCart'
import Product from '../lib/product';

describe("Shopping cart", () => {
    it("Group products in one item",()=>{
        var shoppingCart = new ShoppinCartModel();
        var product = new Product();
        var product1 = new Product();
        var product2 = new Product();

        product.id = 1;
        product1.id = 1;
        product2.id = 2;        

        shoppingCart.add(product);
        shoppingCart.add(product1);
        shoppingCart.add(product2);

        expect(shoppingCart.items.length).equals(2);
    });
    it("Can calculate total price with speacial price",() =>{
        var shoppingCart = new ShoppinCartModel();
        var product = new Product();
        var product1 = new Product();
        var product2 = new Product();
        product.id = 1;
        product.price = 10;
        product.specialPrice = 5;
        product1.id = 1;
        product1.price = 10;
        product1.specialPrice = 5;
        product2.id = 2;
        product2.price = 10;

        shoppingCart.add(product);
        shoppingCart.add(product1);
        shoppingCart.add(product2);

        expect(shoppingCart.getTotal()).equals(20);
    });
    it("Can calculate total price",() =>{
        var shoppingCart = new ShoppinCartModel();
        var product = new Product();
        var product1 = new Product();
        var product2 = new Product();
        product.id = 1;
        product.price = 10;
        product1.id = 1;
        product1.price = 10;
        product2.id = 2;
        product2.price = 10;

        shoppingCart.add(product);
        shoppingCart.add(product1);
        shoppingCart.add(product2);

        expect(shoppingCart.getTotal()).equals(30);
    });
});