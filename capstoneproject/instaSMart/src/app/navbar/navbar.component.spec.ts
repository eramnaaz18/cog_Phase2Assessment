import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import {Location} from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';
import { ProductsModule } from '../products/products.module';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from '../app.effects';
import { CartModule } from '../cart/cart.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  //creating variables for location and router of type Location and Router respectively
  //these will be used in beforeEach() block to initialize the route and location to be navigated
  let location: Location;
  let router: Router;

  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        NavbarComponent,
        
      ],
      imports: [HttpClientModule,
        //here we are declaring all the routing paths we want to test for navbar navigation
        RouterTestingModule.withRoutes(
          [
            {
              path: '', component:HomeComponent
            },
            {path:'home',component:HomeComponent},
            {path:'about',component:AboutUsComponent},
            {path:'contact',component:ContactUsComponent}, 
            {path:'login',component:LoginComponent},
            {
              path:'products',
              loadChildren:()=>{return ProductsModule;},
              
              },
          
            {
              path:'cart',
              loadChildren:()=>{return CartModule;},
              
              },
            {path: '404', component: NotfoundComponent},
            {path: '**', redirectTo: '/404'}
            
          ]
        ),
        StoreDevtoolsModule.instrument(),
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([AppEffects, ]),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //the initialNavigation() sets up the location change listener and initializes the navigation
    router.initialNavigation();

    service = TestBed.inject(AuthService);
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have auth service',()=>{
    expect(service).toBeTruthy();
  })

  //to check if no path mentioned it takes to home page or not
  it('navigate to "" redirects you to home page', fakeAsync(() => { 
    router.navigate(['']);
    tick(); 
    expect(location.path()).toBe('/'); 
  }));

  //test to take it back to home page when home link is clicked
  it('navigate to "home" redirects you to home page', fakeAsync(() => { 
    router.navigate(['home']);
    tick(); 
    expect(location.path()).toBe('/home'); 
  }));


  //test to take it back to about us page when about us link is clicked
  it('navigate to "about" redirects you to About Us page', fakeAsync(() => { 
    router.navigate(['about']);
    tick(); 
    expect(location.path()).toBe('/about'); 
  }));

  //test to take it back to contact us page when contact us link is clicked
  it('navigate to "contact" redirects you to Contact Us page', fakeAsync(() => { 
    router.navigate(['contact']);
    tick(); 
    expect(location.path()).toBe('/contact'); 
  }));

  //test to take it back to login page when login link is clicked
  it('navigate to "login" redirects you to Login page', fakeAsync(() => { 
    router.navigate(['login']);
    tick(); 
    expect(location.path()).toBe('/login'); 
  }));

  //test navigation to products list
  it('navigate to "products" takes you to /products', fakeAsync(() => {
    router.navigate(["/products"]).then(() => {
      expect(location.path()).toBe("/products");
    });
    flush();
  }));


  //test navigation to carts
  it('navigate to "cart" takes you to /cart', fakeAsync(() => {
    router.navigate(["/cart"]).then(() => {
      expect(location.path()).toBe("/cart");
    });
    flush();
  }));


  //test to take it to NotFound page when any unknown url is tried to fetched
  //it deals with wildcard operation **
  it('navigate to "404" redirects you to NotFound page', fakeAsync(() => { 
    router.navigate(['**']);
    tick(); 
    expect(location.path()).toBe('/404'); 
  }));
  
  //check if logout is hidden if user is not logged in
  it('should not display logout option if user is not logged in', ()=>{
    const loginItem = fixture.nativeElement.querySelector('#login');
    const logoutItem = fixture.nativeElement.querySelector('#logout');
    expect(loginItem).not.toBeNull();
    expect(logoutItem).toBeNull();
  });

  //check if login is success and logout button is displayed
  it('should call logIn when login is success and display logout option as well', () => {
    spyOn(service, 'login').and.returnValue();
    service.login('eram','user');
    expect(service.login).toHaveBeenCalled();
    service.isLoggedIn = true;
    fixture.detectChanges();
    const logoutItem = fixture.nativeElement.querySelector('#logout');
    expect(logoutItem).not.toBeNull();

  });

  //test for checking if logout works
  it('should logout the user',()=>{
    spyOn(service,'logOut').and.returnValue();
    service.login('eram','user');
    service.isLoggedIn = true;
    fixture.detectChanges();
    service.logOut();
    expect(service.logOut).toHaveBeenCalled();
  });


  //test to check if username for logged in user is displayed or not
  it('should display the logged in user name as Hi {{userName}}', ()=>{
    spyOn(service, 'login').and.returnValue();
    service.login('eram','user');
    expect(service.login).toHaveBeenCalled();
    service.isLoggedIn = true;
    let user = {
      id:1,
      userName: 'eram',
      password: 'user',
      isAdmin: false
    }
    service.currentUser = user;
    fixture.detectChanges();
    expect(component.userName).toBe('eram');
  });


});
