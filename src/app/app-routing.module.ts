import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsViewComponent } from './products-view/products-view.component';
import { BillingViewComponent } from './billing-view/billing-view.component';

const routes: Routes = [
  { path: '', component: ProductsViewComponent },
  { path: 'billing', component: BillingViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
