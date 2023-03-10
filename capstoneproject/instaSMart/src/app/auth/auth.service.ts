import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { User } from "../user/user";


@Injectable({
    providedIn:'root'
})
export class AuthService{

    //takes in the users from in-memory-db (web-api)
    url='/api/users';
    currentUser!:User |null;
    redirectToUrl!:string;
    users:User[]=[];
    foundIndex!:number;
    isValid:boolean=false;
    isLoggedIn:boolean=false;
    isAdminType: boolean=false;

    constructor(private http:HttpClient){}

    //it fetches all the users from the db and taps data into users[]
    fetchAllUsers():Observable<User[]>{
      return this.http.get<User[]>(this.url).pipe(

        tap(data=>{
          this.users=data;
          console.log(this.users)
    }),
        catchError(this.errorHandler)
    );

  }


    login(userName:string,password:string):void{
      

     }


     //this is to validate the entry of user
     //it checks if user data entered is valid against the details stored in db
     //if the user is valid, then its details are stored in sessionStorage and
     //allowed to navigate through various links that requires admin priviledges/successful login
     validateUser(user:any,users:User[]):boolean{

      console.log('validating the user',user)
      user={...user};
      this.foundIndex=users.findIndex(u=>(u.userName==user.userName && u.password == user.password));
      
      console.log('found index ',this.foundIndex)
      if(this.foundIndex > -1){

        this.currentUser=this.users[this.foundIndex];
        console.log('found the user ',this.users[this.foundIndex])
        sessionStorage.setItem('loggedInUser',JSON.stringify(this.currentUser));
        this.isValid=true;
        this.isLoggedIn=true;
        if(this.currentUser.isAdmin){
          this.isAdminType = true;
          sessionStorage.setItem('isAdmin','true');
        }
        else if(!this.currentUser.isAdmin){
          this.isAdminType = false;
          sessionStorage.setItem('isAdmin','false');
        }
        
       sessionStorage.setItem('isLogged','true');
       
        return true;
      }
    return false;

    }

    //it logs out the currently logged user by removing the detail from sessionStorage
    logOut():void{
      sessionStorage.removeItem('loggedInUser');
        this.currentUser=null;
        this.isLoggedIn=false;
        sessionStorage.removeItem('isLogged');
    }

    
    //checks if currently logged in user is admin or not
    isAdmin():boolean{
      console.log(this.currentUser)
        if(this.currentUser)
        return this.currentUser?.isAdmin;

        return false;
    }




  //errorhandler which returns the Observable with errorMessage
  errorHandler=(err:any)=>{

    let errorMessage:string;
    //a client side error or network error then ErrorEvent object will be thrown

    if(err.error instanceof ErrorEvent)
      {

        errorMessage = `An error has occured ${err.error.message}`
      }
      else{

       errorMessage =  `Backend error code ${err.status} ${err.body.error}`;

      }
      console.log(err);
      return throwError(errorMessage);


   }

  }