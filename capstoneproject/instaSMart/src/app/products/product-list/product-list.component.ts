import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ProductsService } from 'shared/products.service';
import { State } from 'src/app/state/app.state';
import { getProducts, getError, getCurrentProduct } from 'src/app/state/products/product.selectors';
import { IProduct } from '../products.model';
import * as ProductActions from '../../state/products/product.actions'
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'shared/cart.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy{
  products : IProduct[] = [];
  errorMessage: string="";
  sub!:Subscription;
  href:string='';

  isLoggedIn:boolean=false;

  products$!:Observable<IProduct[]>;
  
  selectedProduct$!:Observable<any>;
  errorMessage$!: Observable<string>;

  dataReceived=this.productService.getProducts();
  obsProducts$!:Observable<IProduct[]>;
 
  constructor(private cartService: CartService, private store:Store<State>, private productService: ProductsService, private router:Router, private authservice:AuthService,) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(sessionStorage.getItem('isAdmin')=='true'){
      this.isLoggedIn=true;
    }
   
    this.isLoggedIn=false;
  }
  selectedProduct!:IProduct | null;

  ngOnInit(): void {
    
    this.href=this.router.url;
    console.log(this.href)
   

    this.products$ = this.store.select(getProducts);
    this.products$.subscribe(resp=>this.products=resp);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);


    this.isLoggedIn=this.authservice.isAdminType;
     
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
    //this.isLoggedIn = false;
  }

  /* 
 _prodCategory!:Category; */
 showImage:boolean=false;
 imageWidth:number=80;
 imageHeight:number=80;
 imageMargin:number=5;
 filteredProducts:IProduct[]=[];
 filterValue!:string;


toggleImage():void{

  this.showImage= !this.showImage;
}




newProduct():void{
 
  this.store.dispatch(ProductActions.initializeCurrentProduct());
  console.log(this.productService.newProduct());
  
}
 productSelected(product:IProduct):void{
  
  /* this.productService.changeSelectedProduct(product); */
  this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
  console.log(product);
 }

 /* get isLoggedIn():boolean{
  //service to return the loggedInstatus ofthe user
  //we will have to inject a authentication service which will checkt the loggedIn
 //still pending
  return this.authservice.isLoggedIn();
} */
/* 
 addToCart(product:IProduct) {
  window.alert('Your product has been added to the cart!');
  this.cartService.addToCart(product);
 
} 
 */

addtocart(item: any){
  this.cartService.addtoCart(item);
}

}
