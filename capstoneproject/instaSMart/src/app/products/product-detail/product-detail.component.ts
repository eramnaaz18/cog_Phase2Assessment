import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'shared/products.service';
import { IProduct } from '../products.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  id:number=0;
  product :IProduct | undefined;
  sub!:Subscription
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private service:ProductsService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
 

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


}
