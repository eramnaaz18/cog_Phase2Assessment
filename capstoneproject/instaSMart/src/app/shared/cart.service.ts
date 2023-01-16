import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : IProduct[] =[]
  public productList = new BehaviorSubject<IProduct[]>([]);
  //products:IProduct[] = [];
  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : IProduct[]){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }


  
 addtoCart(prod : IProduct){
    
    //this.cartItemList.push(product); 
    /* const existing = this.cartItemList.find(({name}) => prod.name === name);
    
    if (existing) {
      existing.qty +=1;
    
      return;
    } */
    this.productList.next(this.cartItemList);
    const productExistInCart = this.cartItemList.find(({name}) => name === prod.name); // find product by name
   if (!productExistInCart) {
     this.cartItemList.push({...prod, qty:1}); 
     // enhance "porduct" opject with "num" property
     return;
   }
   productExistInCart.qty += 1;
    //this.cartItemList.push({...prod, qty: 1});
    
   
    this.getTotalPrice();
   
    console.log(this.cartItemList)
  } 

  
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:IProduct)=>{
      grandTotal += (a.price*a.qty);
    })
    return grandTotal;
  }
  removeCartItem(product: IProduct){
    this.cartItemList.map((a:IProduct, index:number)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}