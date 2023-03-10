import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of, concatMap } from "rxjs";
import { ProductsService } from "src/app/shared/products.service";
import * as ProductActions from './product.actions'

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductsService) { }

  //loading the products
  loadProducts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getProducts()
          .pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({ error })))
          )
        )
      );
  });

  //updating the products
  updateProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.updateProduct),
        concatMap(action =>
          this.productService.updateProduct(action.product)
            .pipe(
              map(product => ProductActions.updateProductSuccess({ product })),
              catchError(error => of(ProductActions.updateProductFailure({ error })))
            )
        )
      );
  });

  //creating the product
  createProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.createProduct),
        concatMap(action =>
          this.productService.createProduct(action.product)
            .pipe(
              map(product => ProductActions.createProductSuccess({ product })),
              catchError(error => of(ProductActions.createProductFailure({ error })))
            )
        )
      );
  });

  //deletion of product
  deleteProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct),
        mergeMap(action =>
          this.productService.deleteProduct(action.productId).pipe(
            map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
            catchError(error => of(ProductActions.deleteProductFailure({ error })))
          )
        )
      );
  });
}