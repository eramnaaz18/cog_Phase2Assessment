import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : IProduct[] =[]
  public productList = new BehaviorSubject<IProduct[]>([]);
  
  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : IProduct[]){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }


  
 addtoCart(prod : IProduct){
   
    this.productList.next(this.cartItemList);
    const productExistInCart = this.cartItemList.find(({name}) => name === prod.name); // find product by name
   if (!productExistInCart) {
     this.cartItemList.push({...prod, qty:1}); //pushes the product with initial quantity as 1
     return;
   }
   //if product already existing should only update quantity and not add duplicates
   productExistInCart.qty += 1;
    //get initial price from products list when added to cart
    this.getTotalPrice();
   
    console.log(this.cartItemList)
  } 

  //to calculate total price of items in the cart
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:IProduct)=>{
      grandTotal += (a.price*a.qty);
    })
    return grandTotal;
  }

  //to remove one item as a time
  removeCartItem(product: IProduct){
    this.cartItemList.map((a:IProduct, index:number)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }


  //to remove all the items at once from cart
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}