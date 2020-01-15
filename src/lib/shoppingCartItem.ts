import Product from './product';
export default class ShoppingCartItem {
    count:number;
    product:Product;
    constructor(product:Product) {
        this.product = product;
        this.count = 1;
    }

    getTotal():number{
        let total:number = 0;
        for (let i = 0; i < this.count; i++) {
            total += this.product.getPrice();          
        }
        return total;
    }
}