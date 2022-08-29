import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsViewComponent } from './products-view.component';
import { ProductService } from '../services/product.service';

describe('ProductsViewComponent', () => {
  let component: ProductsViewComponent;
  let fixture: ComponentFixture<ProductsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsViewComponent],
      providers: [ProductsViewComponent, { provide: ProductService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('Welcome to Products editting');
  });

  it('should render empty table', () => {
    const table = fixture.nativeElement.querySelector('table#products-table');
    expect(table).toBeTruthy();
  });

  it('should add a table row on button click', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr');
    const rowsNumber = rows.length;
    const addBtn = fixture.nativeElement.querySelector('button#add-product');
    addBtn.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(rowsNumber + 1);
  });

  it('should render confirmation buttons on adding a product', () => {
    const addBtn = fixture.nativeElement.querySelector('button#add-product');
    addBtn.click();
    fixture.detectChanges();
    const rowsNumber = fixture.nativeElement.querySelectorAll('tr.product-row').length;
    const confirmBtn = fixture.nativeElement.querySelector(`#confirm-${rowsNumber - 1}`);
    const cancelBtn = fixture.nativeElement.querySelector(`#cancel-${rowsNumber - 1}`);
    expect(confirmBtn).toBeTruthy();
    expect(cancelBtn).toBeTruthy();
  });

  it('should deactivate save button defore edit confirm', () => {
    const addBtn = fixture.nativeElement.querySelector('button#add-product');
    addBtn.click();
    fixture.detectChanges();
    const saveBtn = fixture.nativeElement.querySelector('button#save-products');
    expect(saveBtn.disabled).toBeTruthy();
  });

  it('should deactivate add button defore edit confirm', () => {
    const addBtn = fixture.nativeElement.querySelector('button#add-product');
    addBtn.click();
    fixture.detectChanges();
    expect(addBtn.disabled).toBeTruthy();
  });

  it('should have disabled input fields before editting start', () => {
    const addBtn = fixture.nativeElement.querySelector('button#add-product');
    addBtn.click();
    fixture.detectChanges();
    const rowsNumber = fixture.nativeElement.querySelectorAll('tr.product-row').length;
    const confirmBtn = fixture.nativeElement.querySelector(`#confirm-${rowsNumber - 1}`);
    confirmBtn.click();
    fixture.detectChanges();
    const codeInput = fixture.nativeElement.querySelector(`input#code-input-${rowsNumber - 1}`);
    const nameInput = fixture.nativeElement.querySelector(`input#name-input-${rowsNumber - 1}`);
    const basePriceInput = fixture.nativeElement.querySelector(`input#name-input-${rowsNumber - 1}`);
    expect(codeInput.disabled).toBeTruthy();
    expect(nameInput.disabled).toBeTruthy();
    expect(basePriceInput.disabled).toBeTruthy();
  });

  it('should enable editting fields when new product is added', () => {
    const addBtn = fixture.nativeElement.querySelector('button#add-product');
    addBtn.click();
    fixture.detectChanges();
    const rowsNumber = fixture.nativeElement.querySelectorAll('tr.product-row').length;
    const codeInput = fixture.nativeElement.querySelector(`input#code-input-${rowsNumber - 1}`);
    const nameInput = fixture.nativeElement.querySelector(`input#name-input-${rowsNumber - 1}`);
    const basePriceInput = fixture.nativeElement.querySelector(`input#name-input-${rowsNumber - 1}`);
    expect(codeInput.disabled).toBeFalsy();
    expect(nameInput.disabled).toBeFalsy();
    expect(basePriceInput.disabled).toBeFalsy();
  });

});
