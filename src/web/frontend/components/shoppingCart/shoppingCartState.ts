import ShoppingCartModel from "../../../../lib/shoppingCart";

export default class ShoppingCartState {
    shoppingCart: ShoppingCartModel;
    loading:boolean;
    constructor() {
        this.shoppingCart= new ShoppingCartModel();
        this.loading = true;
    }
}