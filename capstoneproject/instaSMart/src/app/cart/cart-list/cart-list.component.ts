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
  /* items:IProduct[]=[];
  checkoutForm!: FormGroup;
  count=0;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
    this.count= this.items.length;
    console.log(this.count);
  }

  onSubmit(customerData:NgForm) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  } */


  public products : IProduct[] = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  total() {
    return this.products.reduce((sum, prod) => sum += prod.price*prod.qty ,0)
  }

  removeItem(item: IProduct){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  increase(product: IProduct){
    product.qty++;
  
   }
  
   decrease(product:IProduct){
    if(product.qty>1){
      product.qty--;
    }
    else{
      //alert("We cannot decrement more");
      this.removeItem(product);
    }
   }

}