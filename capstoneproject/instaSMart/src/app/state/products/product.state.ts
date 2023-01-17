import { IProduct } from '../../products/products.model';
import * as AppState from '../../state/app.state';


export interface State extends AppState.State {
    products: ProductState;
  }

  //exports the ProductState interface with currentProductId, products[] and error msg
  export interface ProductState{
    currentProductId:number | null;
    products:IProduct[];
    error:string;
  }
  
  //the initial ProductState has currentProductId as null, empty products[] and error msg also empty
  export const initialState:ProductState={
    currentProductId:null,
    products:[],
    error:''
  }