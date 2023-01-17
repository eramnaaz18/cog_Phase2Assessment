import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/shared/cart.service";
import { IProduct } from "src/app/products/products.model";


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  public products : IProduct[] = [];
  public grandTotal !: number;

  //injects the cartService so that we can use getProducts() to get products in the cart
  //and also calculate total based on getTotalPrice()
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  //calculates total based on any other increment or decrement in the cart
  total() {
    return this.products.reduce((sum, prod) => sum += prod.price*prod.qty ,0)
  }

  //removes the item as a single unit at once
  removeItem(item: IProduct){
    this.cartService.removeCartItem(item);
  }

  //removes all items at once
  emptycart(){
    this.cartService.removeAllCart();
  }

  //increments the product quantity in the cart
  increase(product: IProduct){
    product.qty++;
  
   }
  
   //decrements the product quantity in the cart
   decrease(product:IProduct){
    if(product.qty>1){
      product.qty--;
    }
    else{
      //if the product quantity is 1 it should completely remove the product instead of taking negative value
      this.removeItem(product);
    }
   }

}