import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRODUCTS_KEY, PRODUCTS_TAX_RATES_KEY, TOTAL_KEY } from '../constants/productConstants';
import { Product, ProductTax } from '../products-view/productTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private saveItemToStorage(itemKey: string, items: any) {
    localStorage.setItem(itemKey, JSON.stringify(items));
  };

  getProducts(): Observable<Product[]> {
    const productsFromStorage = localStorage.getItem(PRODUCTS_KEY);
    let products: Product[] = [];
    if (productsFromStorage) {
      products = JSON.parse(productsFromStorage);
    };
    return of(products);
  };

  saveProducts(products: Product[]) {
    this.saveItemToStorage(PRODUCTS_KEY, products);
  };

  getProductsTaxes(): Observable<ProductTax[]> {
    const taxesFromStorage = localStorage.getItem(PRODUCTS_TAX_RATES_KEY);
    let taxes: ProductTax[] = [];
    if (taxesFromStorage) {
      taxes = JSON.parse(taxesFromStorage);
    };
    return of(taxes);
  };

  saveProductsTaxes(taxes: ProductTax[]) {
    this.saveItemToStorage(PRODUCTS_TAX_RATES_KEY, taxes);
  };

  getTotal(): Observable<number> {
    const totalFromStorage = localStorage.getItem(TOTAL_KEY);
    let total: number = 0;
    if (totalFromStorage) {
      total = Number(totalFromStorage);
    };
    return of(total);
  };

  saveTotal(total: number) {
    this.saveItemToStorage(TOTAL_KEY, total);
  };
}
