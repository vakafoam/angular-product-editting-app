import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsViewComponent } from './products-view/products-view.component';

const routes: Routes = [
  { path: 'list', component: ProductsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
