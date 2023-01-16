import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/products.service';
import { State } from 'src/app/state/app.state';
import { IProduct } from '../products.model';
import * as ProductActions from '../../state/products/product.actions'
import { AuthService } from 'src/app/auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
        ]),
    ])
],
})
export class ProductDetailComponent implements OnInit, OnChanges, OnDestroy{

  id:number=0;
  product :IProduct | undefined;
  sub!:Subscription;
  isLoggedIn:boolean=false;
  constructor(private store:Store<State>,private authservice:AuthService, private activatedRoute:ActivatedRoute,private router:Router,private service:ProductsService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(sessionStorage.getItem('isAdmin')=='true'){
      this.isLoggedIn=true;
    }
   
    this.isLoggedIn=false;
  }

  ngOnInit(): void {
 
    this.isLoggedIn=this.authservice.isAdminType;
     this.sub = this.activatedRoute.paramMap.subscribe((params)=>{
       console.log(params);
       let product_id=params.get('id');
        if(product_id){
          this.id=+product_id;
        }

       if(this.service.getProductById(this.id)){
             this.product = this.service.getProductById(this.id);
       } 
     })

  }

  
  /* addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  } */

  deleteProduct(prod:IProduct | null | undefined):void{
    if(prod && prod.id){

      if(confirm(`Are you sure you want to delete ${prod.name} details`)){

        
        this.store.dispatch(ProductActions.deleteProduct({ productId: prod.id }));
      }
      else{
       
        this.store.dispatch(ProductActions.clearCurrentProduct());
        
      }
    }
  }

  productSelected(product:IProduct):void{
  
    /* this.productService.changeSelectedProduct(product); */
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
    console.log(product);
   }



   showDiv: boolean= false;
   show(){
     this.showDiv = true;
   }
}
