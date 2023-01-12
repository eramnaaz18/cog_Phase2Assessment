import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Category } from "src/app/products/products.model";
import { ProductState } from "./product.state";

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {

    if (currentProductId === 0) {
      return {
        id:0,
        name:'',
        category:Category.clothing,
        price:0,
        image:'',
        rating:1,
        qty:0,
        brand:'',
        seller:''
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);