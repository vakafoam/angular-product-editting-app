import { Component, OnInit } from '@angular/core';

export interface Product {
  id: number,
  code: number;
  name: string;
  basePrice: number;
  totalPrice: number;
}

export interface ProductTax {
  productId: number;
  tax: number;
}

export type ProductWithTax = Product & Pick<ProductTax, 'tax'>;

const TAX_RATES = [0, 20, 21, 33, 50];
const DEFAULT_TAX_RATE = 21;

const PRODUCT_TEMPLATE = {
  id: 0,
  code: 0,
  name: 'Product name',
  basePrice: 0,
  totalPrice: 0
};

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  productToEdit: ProductWithTax | null = null;
  products: Product[] = [];
  taxRates = TAX_RATES;
  private productsTaxes: ProductTax[] = [];

  constructor() { }

  ngOnInit(): void {
    // TODO: data fetch from a storage
    this.products = new Array(2).fill(1).map((x, i) => ({ ...PRODUCT_TEMPLATE, code: i + 100, basePrice: 1, id: i + 1 }));
    // store taxes for each product in a different data structure to maintain original Product DTO (without tax property)
    this.productsTaxes = this.products.map(p => ({ productId: p.id, tax: 21 }));
    // this.tempProducts = JSON.parse(JSON.stringify(this.products));
  }

  addProduct = () => {
    const newProduct = {
      ...PRODUCT_TEMPLATE,
      id: this.products[this.products.length - 1].id + 1,
    };
    this.products.push(newProduct);
    this.productToEdit = { ...newProduct, tax: DEFAULT_TAX_RATE };
    this.productsTaxes.push({ productId: newProduct.id, tax: DEFAULT_TAX_RATE });
  }

  onFieldChange = (e: any, field: string) => {
    this.productToEdit = { ...this.productToEdit as ProductWithTax, [field]: e.target.value };
  }

  deleteProduct = (i: Product['id']) => {
    const currentProductIdx = this.products.findIndex(prod => prod.id === i);
    if (currentProductIdx >= 0) {
      this.products.splice(currentProductIdx, 1);
    }
  }

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
    this.productToEdit = null;
  };

  cancelEditting = () => this.productToEdit = null;

  selectTax = (e: Event, id: number) => {
    const value = (e.target as HTMLInputElement).value;
    if (this.productToEdit?.id === id) this.productToEdit.tax = Number(value);
  }

  getTaxForProductId = (id: number, tax: any) => {
    return id === this.productToEdit?.id ? this.productToEdit.tax : this.productsTaxes.find(t => t.productId === id)?.tax;
  };

  isItEditProduct = (id: number) => {
    return id === this.productToEdit?.id
  };

  calculateTotal = () => {
    let total = 0;
    this.products.forEach(p => {
      const basePrice = p.basePrice;
      const tax = this.productsTaxes.find(t => t.productId === p.id)?.tax;
      const price = basePrice * (1 + (tax as number) / 100);
      total += price;
    });
    return total;
  }

  saveProducts = () => {
    // TODO: save to some storage
  }
}
