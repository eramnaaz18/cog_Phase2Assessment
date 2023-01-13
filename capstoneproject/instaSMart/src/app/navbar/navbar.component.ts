import { Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CartService } from 'shared/cart.service';
import { AuthService } from '../auth/auth.service';
import { IProduct } from '../products/products.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy{
    
      //the constructer has all the services mentioned which we will be incorporating for navbar component
      constructor(private router:Router,private authservice:AuthService, private cartService: CartService){ 
        
      }

      
      //takes in parameter and later checks for userType being admin or not when component is initialised
      isLoggedIn:boolean=false;

      sub!:Subscription;


      amount:number=0;

      products!:IProduct[];



      //service to return the loggedInstatus ofthe user
      //we will have to inject a authentication service which will check the loggedIn status if true or false
      //accordingly with true state the user will be able to proceed with functionalities which requires
      //users to be logged in into the app first
      get isLoggedInUser():boolean{
       
        return this.authservice.isLoggedIn;
      }



      //here we will access the currentUser from the authService (the logged in user)
      //and get the username to display it on the navbar when user logs in
      get userName():string{
      
      if(this.authservice.currentUser)
        return this.authservice.currentUser?.userName;
      
      return '';
      
      }



      ngOnInit(): void {
         //checks if user is logged in
          this.isLoggedIn=this.authservice.isLoggedIn;
          if(sessionStorage.getItem('isLogged')==='true'){
          this.isLoggedIn=true;
          } console.log(this.isLoggedIn, 'from init of menu ')


          //subscribes to the cart service and gets all the products that are added to cart
          this.sub=this.cartService.getProducts()
            .subscribe(res=>{
             
              this.products=res;
               })
               
          
        }


        //this to get total count of products in the cart and display on top of cart icon in navbar
        total() {
          return this.products.reduce((sum, prod) => sum += prod.qty ,0)
        }



      //the user gets logged out with this method call and redirects to home component
      //also there is window.location.reload() functionality added so that when admin logs out of
      //the app, no features or buttons that were available to the admin are accessible by the user
        logOut():void{
      
          this.authservice.logOut();
          
          this.router.navigate(['']);
          window.location.reload();
        }


        //this is to track changes and ensure that functionalities are happening only if user continues to be logged in
        ngOnChanges():void{

          console.log('menu component changes');
          if(sessionStorage.getItem('isLogged')=='true'){
            this.isLoggedIn=true;
          }
        }


      //when the navbar closes, the sub should be unsubscribed to have a good practise with the usage of
      //Subscription module
        ngOnDestroy(){
          this.sub.unsubscribe();
        }
        
}