import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {PageNotfountComponent} from './components/shared/page-notfount/page-notfount.component';

const routes: Routes = [
  {path : '' , redirectTo : '/shop', pathMatch: 'full' },
  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'shop' , component : ShoppingCartComponent},
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
