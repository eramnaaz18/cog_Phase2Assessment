import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'shared/cart.service';
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

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.cart = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })

    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required]],
      expiryDate: ['',[Validators.required]],
      cvv : ['',[Validators.required]],
      cardHolder: ['', [Validators.required]],
      });
  }

  total() {
    return this.cart.reduce((sum, prod) => sum += prod.price*prod.qty ,0)
  }


  showDiv: boolean= false;
  payment(){
    this.showDiv = true;
  }


  paymentForm!: FormGroup;


//Add user form actions
get f() { return this.paymentForm.controls; }
onSubmit() {
  
    alert("Your products will be delivered soon!");
    this.cart.length = 0;
    
}

}
