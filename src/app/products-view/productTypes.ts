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
  