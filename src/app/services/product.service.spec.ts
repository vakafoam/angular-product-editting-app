import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { PRODUCT_TEMPLATE, PRODUCTS_TAX_RATES_KEY, PRODUCTS_KEY, TOTAL_KEY, TAX_RATES } from '../constants/productConstants';

const SAMPLE_TAX_RATE = { productId: 1, tax: 21 };

let service: ProductService;
let localStore: any = {
  [PRODUCTS_KEY]: JSON.stringify([PRODUCT_TEMPLATE]),
  [PRODUCTS_TAX_RATES_KEY]: JSON.stringify([SAMPLE_TAX_RATE]),
  [TOTAL_KEY]: 21
};
const mockLocalStorage = {
  getItem: (key: string): string => {
    return key in localStore ? localStore[key] : null;
  },
  setItem: (key: string, value: string) => {
    localStore[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete localStore[key];
  },
  clear: () => {
    localStore = {};
  }
};

describe('ProductService created', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    spyOn(window.localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(window.localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(window.localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(window.localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product items from storage', (done: DoneFn) => {
    service.getProducts().subscribe(value => {
      expect(value).toEqual([PRODUCT_TEMPLATE]);
      done();
    });
  });

  it('should get tax rate items from storage', (done: DoneFn) => {
    service.getProductsTaxes().subscribe(value => {
      expect(value).toEqual([SAMPLE_TAX_RATE]);
      done();
    });
  });

  it('should get total amount from storage', (done: DoneFn) => {
    service.getTotal().subscribe(value => {
      expect(value).toBe(21);
      done();
    });
  });

  it('should save product items to the storage', () => {
    mockLocalStorage.clear();
    expect(localStore[PRODUCTS_KEY]).toBeUndefined();
    service.saveProducts([PRODUCT_TEMPLATE]);
    expect((localStore[PRODUCTS_KEY])).toBe(JSON.stringify([PRODUCT_TEMPLATE]));
  });

  it('should save tax rate items to the storage', () => {
    mockLocalStorage.clear();
    expect(localStore[PRODUCTS_TAX_RATES_KEY]).toBeUndefined();
    service.saveProductsTaxes([SAMPLE_TAX_RATE]);
    expect((localStore[PRODUCTS_TAX_RATES_KEY])).toBe(JSON.stringify([SAMPLE_TAX_RATE]));
  });

  it('should save total amount to the storage', () => {
    mockLocalStorage.clear();
    expect(localStore[TOTAL_KEY]).toBeUndefined();
    service.saveTotal(21);
    expect((localStore[TOTAL_KEY])).toBe(JSON.stringify(21));
  });
});
