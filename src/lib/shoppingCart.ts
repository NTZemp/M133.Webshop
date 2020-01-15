import Product from "./product";
import ShoppingCartItem from "./shoppingCartItem";

export default class ShoppingCartModel {
  items: ShoppingCartItem[];

  constructor() {
      this.items = new Array<ShoppingCartItem>();
  }

  add(product: Product): void {
    var item = this.items.find(x => x.product.id == product.id);
    if (item) {
      this.items[this.items.indexOf(item)].count++;
    } else {
      this.items.push(new ShoppingCartItem(product));
    }
  }

  remove(id:number):void{
    var item = this.items.find(x => x.product.id == id);
    if(!item){
      throw new Error('No product of type in Shopping Cart');
    }
    if(item.count == 1){
      var index = this.items.indexOf(item);
      this.items.splice(index ,1);
    }else{
      item.count--;
    }
  }
  getTotal(): number {
    let total: number = 0;
    this.items.forEach(item => {
      console.log(JSON.stringify(item));
      total += item.getTotal();
    });
    return total;
  }

  getAllItems(): ShoppingCartItem[] {
    try {
      return this.items;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
