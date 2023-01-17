import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users:User[]=[];
  pageTitle:string='Log In';
  
  //injecting various services
  constructor(private authService:AuthService,private router:Router) { }

  //on init fetches all users from in memory web api
  ngOnInit(): void {this.authService.fetchAllUsers().subscribe(data=>this.users=data)}


  //cancel button takes back to home page
  cancel():void{

    this.router.navigate(['']);
  }

  //submission of form renders navbar with logged in username and logout option
  //also redirents to home page
  onSubmit(loginForm:NgForm){
    if(loginForm && loginForm.valid){
      const userName = loginForm.form.value.userName;
      const password=loginForm.form.value.password;
      //this user is logged in
      if(this.authService.validateUser({userName,password},this.users))
      {
        confirm('Login Successful!');
      }
      else{
        confirm('Login Failed! Please try again!');
      }
      console.log('after login  ')
      if(this.authService.redirectToUrl){
        this.router.navigateByUrl(this.authService.redirectToUrl);
        
      }
      else{
        
          this.router.navigate(['']);
      }
    }

  }
}