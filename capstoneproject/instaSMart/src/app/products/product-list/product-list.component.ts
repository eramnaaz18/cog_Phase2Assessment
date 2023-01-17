import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/products.service';
import { State } from 'src/app/state/app.state';
import { getProducts, getError, getCurrentProduct } from 'src/app/state/products/product.selectors';
import { IProduct } from '../products.model';
import * as ProductActions from '../../state/products/product.actions'
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { ThemePalette } from '@angular/material/core';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy{

  products : IProduct[] = [];
  //errorMessage: string="";
  //sub!:Subscription;
  //selectedProduct!:IProduct | null;
  href:string='';
  isLoggedIn:boolean=false;

  products$!:Observable<IProduct[]>;
  selectedProduct$!:Observable<any>;
  errorMessage$!: Observable<string>;
  dataReceived=this.productService.getProducts();
  obsProducts$!:Observable<IProduct[]>;

  color: ThemePalette = 'accent';
  showImage:boolean=false;
  filterValue!:string;

 

  
 //injecting various services
  constructor(private cartService: CartService, private store:Store<State>, private productService: ProductsService, private router:Router, private authservice:AuthService,) { }
  
  //keeping a track of admin users
  ngOnChanges(changes: SimpleChanges): void {
    if(sessionStorage.getItem('isAdmin')=='true'){
      this.isLoggedIn=true;
    }
   
    this.isLoggedIn=false;
  }


  


  //on init the href is given the current url and then products are fetched from store (ngRx used)
  ngOnInit(): void {
    
    this.href=this.router.url;
    console.log(this.href)
   

    this.products$ = this.store.select(getProducts);
    this.products$.subscribe(resp=>this.products=resp);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    //checks the admin type of the logged in user (boolean value)
    this.isLoggedIn=this.authservice.isAdminType;
     
  }

  ngOnDestroy(): void {
  }


  //for displaying or hiding image
toggleImage():void{

  this.showImage= !this.showImage;
}



//the method is called when user clicks on Add New Product button
newProduct():void{
 
  this.store.dispatch(ProductActions.initializeCurrentProduct());
  console.log(this.productService.newProduct());
  
  
}

//the currently selected product
 productSelected(product:IProduct):void{
  
  this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
  console.log(product);
 }


 //on click of cart icon addtocart method is called
addtocart(item: any){
  this.cartService.addtoCart(item);
}

}
