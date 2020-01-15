import Product from './product';
import ShoppingCartItem from './shoppingCartItem';
import ShoppingCart from './shoppingCart';

export function parseProduct(product:Product): Product{
    var newProduct = new Product();
    newProduct.id = product.id;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.imageName = product.imageName;
    newProduct.price = product.price;
    newProduct.specialPrice = product.specialPrice;
    return newProduct;
}

export function parseShoppinCartItem(shoppingCartItem: ShoppingCartItem):ShoppingCartItem{
    var product = parseProduct(shoppingCartItem.product);
    var newShoppingCartItem = new ShoppingCartItem(product);
    newShoppingCartItem.count = shoppingCartItem.count;
    return newShoppingCartItem;
}

export function parseShoppinCart(shoppingCart:ShoppingCart): ShoppingCart{
    var newShoppingCart = new ShoppingCart();
    for(var i = 0; i < shoppingCart.items.length; i++){
        newShoppingCart.items.push(parseShoppinCartItem(shoppingCart.items[i]));
    }
    return newShoppingCart;
}