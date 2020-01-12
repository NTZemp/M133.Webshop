export  default class Product {
    id:number;
    name: string;
    price:number;
    specialPrice?: number;
    description: string;
    imageName:string;
    constructor(){
        this.id=1;
        this.name = "";
        this.description = "";
        this.price = 0;
        this.imageName = "";
    }
}