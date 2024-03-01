import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import {ProductService} from './product.service';
import { CategoryComponent } from './components/category.component';
import { OrderFormComponent } from './components/order-form.component';
import {ConfirmCheckoutComponent} from './components/confirm-checkout.component';
import { SideStoreComponent } from './components/side-store.component';
import { CartStore } from './cart.store';

// NOTE: you are free to modify this file

const appRoutes: Routes = [
  {path: '', component: MainComponent, title: 'Ecommerce Website'},
  {path: 'listProduct', component: CategoryComponent, title: 'Product List'},
  {path: 'category', component: CategoryComponent, title: 'Product List'},
  { path: 'category/:category', component: CategoryComponent, data: { title: 'Product List' } },
  {path: 'checkout', component: ConfirmCheckoutComponent, title: 'Check Out'},
  // {path: '', redirectTo: '/', pathMatch: 'full' },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent, MainComponent, CategoryComponent,
    OrderFormComponent, ConfirmCheckoutComponent, SideStoreComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [ ProductService
  ,CartStore ],
  bootstrap: [AppComponent]
})
export class AppModule { }
