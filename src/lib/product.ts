export default class Product {
  id: number;
  name: string;
  price: number;
  specialPrice?: number;
  description: string;
  imageName: string;

  constructor(id?:number,price?:number, specialPrice?:number, name?:string,description?:string) {
    this.id = 1;
    this.name = "";
    this.description = "";
    this.price = 0;
    this.imageName = "";
  }

  

  getPrice(): number {
    return this.specialPrice ? this.specialPrice : this.price;
  }
}
