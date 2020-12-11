import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {PageNotfountComponent} from './components/shared/page-notfount/page-notfount.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductCrudComponent} from './components/product-crud/product-crud.component';

const routes: Routes = [
  {path : '' , redirectTo : '/shop', pathMatch: 'full' },
  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'shop' , component : ShoppingCartComponent},
  {path : 'crud-product' , component : ProductCrudComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent },
  {path : '**', component : PageNotfountComponent}
];

@NgModule({
  imports : [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
