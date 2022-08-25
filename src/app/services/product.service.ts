import { Injectable } from '@angular/core';
import { PRODUCTS_KEY, PRODUCTS_TAX_RATES_KEY } from '../constants/productConstants';
import { Product, ProductTax } from '../products-view/productTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private saveItemToStorage(itemKey: string, items: any) {
    localStorage.setItem(itemKey, JSON.stringify(items));
  };

  getProducts() {
    const productsFromStorage = localStorage.getItem(PRODUCTS_KEY);
    let products: Product[] = [];
    if (productsFromStorage) {
      products = JSON.parse(productsFromStorage);
    };
    return products;
  };

  saveProducts(products: Product[]) {
    this.saveItemToStorage(PRODUCTS_KEY, products);
  };

  getProductsTaxes() {
    const taxesFromStorage = localStorage.getItem(PRODUCTS_TAX_RATES_KEY);
    let taxes: ProductTax[] = [];
    if (taxesFromStorage) {
      taxes = JSON.parse(taxesFromStorage);
    };
    return taxes;
  };

  saveProductsTaxes(taxes: ProductTax[]) {
    this.saveItemToStorage(PRODUCTS_TAX_RATES_KEY, taxes);
  };
}
