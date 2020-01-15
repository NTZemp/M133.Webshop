import Product from "../../../../lib/product";

export default interface AppState{
    products: Product[];
    totalPrice:number;
}