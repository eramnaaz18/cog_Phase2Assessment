import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from '../state/products/product.effects';
import { productReducer } from '../state/products/product.reducer';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RatingComponent } from './rating/rating.component';
import { MaterialsModule } from '../materials-module/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
