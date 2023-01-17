import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { ProductsService } from 'src/app/shared/products.service';
import { State } from 'src/app/state/app.state';
import { getCurrentProduct } from 'src/app/state/products/product.selectors';
import { IProduct } from '../products.model';
import * as ProductActions from '../../state/products/product.actions'


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{

  constructor(private store:Store<State>, private formBuilder: FormBuilder,private router: Router, private productService:ProductsService, private http: HttpClient) { }

  editProduct!: FormGroup;
  product$!: Observable<IProduct | null | undefined  >;
  product!:IProduct | null | undefined;
  errorMessage='';
  pageTitle='Edit Product';


  ngOnInit(){
    //reactive form with validators
    this.editProduct = this.formBuilder.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      image: ['',Validators.required],
      price: ['', Validators.required],
      rating: ['',Validators.required],
      category: ['',Validators.required],
      seller: ['',Validators.required]
  
    });

    this.product$ = this.store.select(getCurrentProduct).pipe(tap(currentProduct => this.displayProduct(currentProduct))
      );
  this.product$.subscribe(resp=>this.product=resp);
  console.log('selected current product in ng onit add product ',this.product);


  this.editProduct.valueChanges.subscribe(
    () => this.errorMessage
  );
  console.log('value in form changes')

  }

    

  //getters for using them in the template
   get id(){
    return this.editProduct.get("id");
  }

  get name(){
    return this.editProduct.get("name");
    }

  get image(){
    return this.editProduct.get("image");
    }
  get price(){
    return this.editProduct.get("price");
      }

  get brand(){
        return this.editProduct.get("brand");
          }
  get category(){
      return this.editProduct.get("category");
        }
  get rating(){
      return this.editProduct.get("rating");
        }

  get seller(){
        return this.editProduct.get("seller");
      }

  displayProduct(productParam:IProduct| null | undefined):void{

    this.product = productParam;
    console.log(productParam?.brand)
    console.log(this.product?.brand)
    if(this.product){
 
  //update the data on the form
  this.editProduct.patchValue({
   id:this.product.id,
    name:this.product.name,
    brand: this.product.brand,
    image:this.product.image,
    rating:this.product.rating,
    price:this.product.price,
    category:this.product.category,
    seller: this.product.seller
 
 
  })
 
 
    }
 
   }


   //the updated data gets saved and redirects to products page
   saveChanges(originalProduct:IProduct | null | undefined):void{
    if(this.editProduct.valid){
      if(this.editProduct.dirty){
        
        const product={...originalProduct,...this.editProduct.value};

    

       this.store.dispatch(ProductActions.updateProduct({ product }));

       
      }


    }
    this.router.navigate(['products'])
  }

 ngOnDestroy(): void {
  
 }

}
