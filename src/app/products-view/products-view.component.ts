import { Component, OnDestroy, OnInit } from '@angular/core';
import { TAX_RATES, DEFAULT_TAX_RATE, PRODUCT_TEMPLATE } from '../constants/productConstants';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product, ProductTax, ProductWithTax } from './productTypes';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['../app.component.scss', './products-view.component.scss']
})
export class ProductsViewComponent implements OnInit, OnDestroy {
  productToEdit: ProductWithTax | null = null;
  products: Product[] = [];
  taxRates = TAX_RATES;
  dataModified = false;
  productsTaxes: ProductTax[] = [];
  total = 0;
  private productsSubscription: Subscription;
  private taxSubscription: Subscription;
  private totalSubscription: Subscription;

  constructor(private productService: ProductService) {
    this.productsSubscription = Subscription.EMPTY;
    this.taxSubscription = Subscription.EMPTY;
    this.totalSubscription = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().subscribe(list => this.products = list);
    this.taxSubscription = this.productService.getProductsTaxes().subscribe(list => this.productsTaxes = list);
    this.totalSubscription = this.productService.getTotal().subscribe(total => this.total = total);
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
    this.taxSubscription?.unsubscribe();
    this.totalSubscription?.unsubscribe();
  }

  addProduct = () => {
    const newProduct = {
      ...PRODUCT_TEMPLATE,
      id: (this.products[this.products.length - 1]?.id || 0) + 1,
    };
    this.products.push(newProduct);
    this.productToEdit = { ...newProduct, tax: DEFAULT_TAX_RATE };
    this.productsTaxes.push({ productId: newProduct.id, tax: DEFAULT_TAX_RATE });
  };

  onFieldChange = (e: any, field: string) => {
    this.productToEdit = { ...this.productToEdit as ProductWithTax, [field]: e.target.value };
  };

  deleteProduct = (i: Product['id']) => {
    const currentProductIdx = this.products.findIndex(prod => prod.id === i);
    if (currentProductIdx >= 0) {
      this.products.splice(currentProductIdx, 1);
    }
    const currentProductTax = this.productsTaxes.findIndex(t => t.productId === i);
    if (currentProductTax >= 0) {
      this.productsTaxes.splice(currentProductTax, 1);
    }
    this.total = this.calculateTotal();
    this.dataModified = true;
  };

  editProduct = (p: Product) => {
    const tax = this.productsTaxes.find(t => t.productId === p.id)?.tax;
    this.productToEdit = { ...p, tax: tax as number };
    setTimeout(() => {
      const codeInput = document.getElementById(`code-input-${p.id}`);
      codeInput && codeInput.focus();
    }, 0);

  };

  confirmEditting = (p: Product) => {
    const currentProductIdx = this.products.findIndex(pr => pr.id === p.id);
    const { tax, ...rest } = this.productToEdit as ProductWithTax;
    // update Product
    if (currentProductIdx >= 0) {
      this.products.splice(currentProductIdx, 1, { ...rest });
    } else {
      this.products.push({ ...rest });
    }
    // update Tax
    const taxesIdx = this.productsTaxes.findIndex(pt => pt.productId === p.id);
    if (taxesIdx >= 0) {
      this.productsTaxes.splice(taxesIdx, 1, { productId: p.id, tax });
    }
    this.total = this.calculateTotal();
    this.productToEdit = null;
    this.dataModified = true;
  };

  cancelEditting = () => this.productToEdit = null;

  selectTax = (e: Event, id: number) => {
    const value = (e.target as HTMLInputElement).value;
    if (this.productToEdit?.id === id) this.productToEdit.tax = Number(value);
  };

  getTaxForProductId = (id: number) => {
    return id === this.productToEdit?.id ? this.productToEdit.tax : this.productsTaxes.find(t => t.productId === id)?.tax;
  };

  isItEditProduct = (id: number) => {
    return id === this.productToEdit?.id;
  };

  calculateTotal = () => {
    let total = 0;
    this.products.forEach(p => {
      const basePrice = p.basePrice;
      const tax = this.productsTaxes.find(t => t.productId === p.id)?.tax;
      const price = basePrice * (1 + (tax || 0) / 100);
      total += price;
    });
    return total;
  };

  saveProducts = () => {
    this.productService.saveProducts(this.products);
    this.productService.saveProductsTaxes(this.productsTaxes);
    this.productService.saveTotal(this.total);
    this.dataModified = false;
  };
}
