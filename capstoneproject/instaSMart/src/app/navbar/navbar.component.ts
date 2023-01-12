import { Component, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit, OnChanges{
    
  /* isLoggedIn:boolean=false;
  
  constructor(private router:Router,private authservice:AuthService){

  }



  
  get userName():string{
  if(this.authservice.currentUser){
    return this.authservice.currentUser.userName;
    
  }
  
  return '';

  }


    ngOnInit(): void {
      
      
      console.log('menu on init');
      this.isLoggedIn=this.authservice.isLoggedIn;
      if(sessionStorage.getItem('isLogged')==='true'){
        this.isLoggedIn=true;
      } console.log(this.isLoggedIn, 'from init of menu ')

    }

    logOut():void{

      //this should also use the authserviceto logout the current user
      //you can route to some url

      this.authservice.logOut();
      this.router.navigate(['']);
    }

    ngOnDestroy(): void {
      console.log('menu destroyed');}


      ngOnChanges():void{

        console.log('menu component changes');
        if(sessionStorage.getItem('isLogged')=='true'){
          this.isLoggedIn=true;
        }
      } */

      get isLoggedInUser():boolean{
        //service to return the loggedInstatus ofthe user
        //we will have to inject a authentication service which will checkt the loggedIn
       //still pending
        return this.authservice.isLoggedIn;
      }
      
      
      get userName():string{
      
      //thru the authentication service we can the current user
      //that we will return
      if(this.authservice.currentUser)
      return this.authservice.currentUser?.userName;
      
      return '';
      
      }
      constructor(private router:Router,private authservice:AuthService, private viewref:ViewContainerRef){ 
        console.log('menu constructor');
      }
      
      isLoggedIn:boolean=false;
        ngOnInit(): void {
          //console.log('menu on init');
          this.isLoggedIn=this.authservice.isLoggedIn;
          if(sessionStorage.getItem('isLogged')==='true'){
          this.isLoggedIn=true;
          } console.log(this.isLoggedIn, 'from init of menu ')
        }
      
        logOut():void{
      
          //this should also use the authserviceto logout the current user
          //you can route to some url
          this.authservice.logOut();
          this.router.navigate(['']);
        }

        ngOnChanges():void{

          console.log('menu component changes');
          if(sessionStorage.getItem('isLogged')=='true'){
            this.isLoggedIn=true;
          }
        }

}