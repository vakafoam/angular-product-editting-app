import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { BillingViewComponent } from './billing-view/billing-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsViewComponent,
    BillingViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { } 
