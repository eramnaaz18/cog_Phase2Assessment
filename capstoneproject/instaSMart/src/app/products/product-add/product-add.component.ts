import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store} from "@ngrx/store";
import { Subscription, Observable, tap } from "rxjs";
import { ProductsService } from "src/app/shared/products.service";
import { getCurrentProduct } from "src/app/state/products/product.selectors";
import { State } from "../../state/app.state";
import { Category, IProduct } from "../products.model";
import * as ProductActions from '../../state/products/product.actions'

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  constructor(private store:Store<State>, private formBuilder: FormBuilder,private router: Router, private productService:ProductsService, private http: HttpClient) { }

  addProduct!: FormGroup;
  sub!:Subscription;
  product!:IProduct | null | undefined;
  pageTitle='Add Product';
  errorMessage='';
  product$!: Observable<IProduct | null | undefined  >;

  
  ngOnInit() {

    //reactive form
    this.addProduct = this.formBuilder.group({
      id: ['',Validators.required],
      name: ['S22', Validators.required],
      brand: ['Samsung', Validators.required],
      price: ['65000', Validators.required],
      rating: ['4.2',Validators.required],
      image: ['',Validators.required],
      category: [Category.mobile,Validators.required],
      seller: ['',Validators.required]

    }); 

    
   
    // Watch for changes to the currently selected product
  this.product$ = this.store.select(getCurrentProduct).pipe(tap(currentProduct => this.displayProduct(currentProduct))
      ); 
this.product$.subscribe(resp=>this.product=resp); 
console.log('selected current product in ng onit add product ',this.product);
    // Watch for value changes for validation
  this.addProduct.valueChanges.subscribe(
      () => this.errorMessage
    );
console.log('value in form changes')

    //when the product is selected from the product list , it should be displayed on the form
   /*  this.addProduct.valueChanges.
    subscribe(()=>this.errorMessage);  */

  }


  //adding the getters to let it communicate with the template
   get id(){
    return this.addProduct.get("id");
  }

  get name(){
    return this.addProduct.get("name");
    }

  get image(){
    return this.addProduct.get("image");
    }
  get price(){
    return this.addProduct.get("price");
      }

  get brand(){
        return this.addProduct.get("brand");
          }
  get category(){
      return this.addProduct.get("category");
        }
  get rating(){
      return this.addProduct.get("rating");
        }


  get seller(){
    return this.addProduct.get("seller");
  } 


  
  displayProduct(productParam:IProduct| null | undefined):void{

   
    this.product = productParam;
    console.log(productParam?.brand)
    console.log(this.product?.brand)
    if(this.product){
      this.addProduct.reset();
 
  //update the data on the form
  this.addProduct.patchValue({
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
 
   //creating a new product (ngRx)
   saveProduct(addProduct: any):void{
 
         const product=addProduct.value;
         this.store.dispatch(ProductActions.createProduct({product}));
         this.router.navigate(['products'])
   }

  ngOnDestroy(): void {
    
  }

  

}