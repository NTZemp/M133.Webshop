import Product from "../../../../lib/product";
import ShoppingCartModel from "../../../../lib/shoppingCart";

export default interface AppState{
    products: Product[];
    shoppinCart:ShoppingCartModel;
    showToast:boolean;
    toastMessage:string;
}