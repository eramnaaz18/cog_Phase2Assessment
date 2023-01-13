import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials-module/materials.module';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    CartListComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule
  ]
})
export class CartModule { }
