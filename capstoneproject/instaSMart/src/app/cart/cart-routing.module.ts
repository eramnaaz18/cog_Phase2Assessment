import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '', component: CartListComponent
  },
  {
    path: 'cart', component: CartListComponent
  },
  {
    path: 'payment', component:PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
