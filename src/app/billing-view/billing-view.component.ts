import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product, ProductTax, ProductWithTax } from '../products-view/productTypes';
import { ProductService } from '../services/product.service';
import { DEFAULT_TAX_RATE } from '../constants/productConstants';


@Component({
  selector: 'app-billing-view',
  templateUrl: './billing-view.component.html',
  styleUrls: ['../app.component.scss', './billing-view.component.scss']
})
export class BillingViewComponent implements OnInit, OnDestroy {
  productsWithTaxes: ProductWithTax[] = [];
  total: number = 0;
  private productsSubscription: Subscription;
  private taxSubscription: Subscription;
  private totalSubscription: Subscription;

  constructor(private productService: ProductService) {
    this.productsSubscription = Subscription.EMPTY;
    this.taxSubscription = Subscription.EMPTY;
    this.totalSubscription = Subscription.EMPTY;
  }

  ngOnInit(): void {
    let products: Product[] = [];
    let productsTaxes: ProductTax[] = [];
    this.productsSubscription = this.productService.getProducts().subscribe(list => products = list);
    this.taxSubscription = this.productService.getProductsTaxes().subscribe(list => productsTaxes = list);
    this.totalSubscription = this.productService.getTotal().subscribe(total => this.total = total);
    this.productsWithTaxes = this.combineProductsAndTaxes(products, productsTaxes);
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
    this.taxSubscription?.unsubscribe();
    this.totalSubscription?.unsubscribe();
  }

  combineProductsAndTaxes(products: Product[], productsTaxes: ProductTax[]) {
    return products.map(p => ({ ...p, tax: productsTaxes.find(t => t.productId === p.id)?.tax || DEFAULT_TAX_RATE }));
  }

  onCheckout() {
    alert('Done');
  }

}
