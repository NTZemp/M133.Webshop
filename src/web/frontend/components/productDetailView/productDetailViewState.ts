import Product from "../../../../lib/product";

export default interface ProductDetailViewState {
  product: Product;
  toastMessage: string;
  showToast: boolean;
}
