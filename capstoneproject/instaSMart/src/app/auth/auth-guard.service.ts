import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})


export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLoggedIn(state.url);


}
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