import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { IProduct } from 'src/app/products/products.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public cart : IProduct[] = [];
  public grandTotal !: number;

  constructor(private cartService : CartService, private formBuilder: FormBuilder, private router: Router) { }

  //on init all the products from cartService is subscribed and also the grandTotal amount of these products
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.cart = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })

  }

  //calculates total amount inside cart item increment decrement
  total() {
    return this.cart.reduce((sum, prod) => sum += prod.price*prod.qty ,0)
  }


  //for the div section we want to display only if value is true
  showDiv: boolean= false;


  //this enables the div section to be displayed
  payment(){
    this.showDiv = true;
  }

  //it empties the cart when user pays for the cart items
  onSubmit() {
    
      alert("Your products will be delivered soon!");
      this.cart.length = 0;
      
  }

}
