import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})


export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}

  //this method returns true or false status for logged in
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLoggedIn(state.url);


}

//this method returns true or false by checking if user is logged in or has admin service
//this enables us to use the logged in status and admin status in later part of project
//which requires some admin rights and logged in user functionalities
 checkLoggedIn(url:string):boolean{

    if(this.authService.isAdmin() || this.authService.isLoggedIn){
     console.log('Auth guard check for admin role')
    return true;
    }

    this.authService.redirectToUrl=url;
    this.router.navigate(['/login']);
    return false;
 }


}