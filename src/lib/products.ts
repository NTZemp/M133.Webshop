export  default class Product {
    name: string;
    price:number;
    specialPrice?: number;
    description: string;
    constructor(){
        this.name = "";
        this.description = "";
        this.price = 0;
    }
}