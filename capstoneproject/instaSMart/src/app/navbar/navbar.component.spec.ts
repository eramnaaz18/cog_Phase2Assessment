import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import {Location} from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  //creating variables for location and router of type Location and Router respectively
  //these will be used in beforeEach() block to initialize the route and location to be navigated
  let location: Location;
  let router: Router;

  
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
            {path: '404', component: NotfoundComponent},
            {path: '**', redirectTo: '/404'}
            
          ]
        )
       
      ]
    })
    .compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //the initialNavigation() sets up the location change listener and initializes the navigation
    router.initialNavigation();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


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


  //test to take it to NotFound page when any unknown url is tried to fetched
  //it deals with wildcard operation **
  it('navigate to "404" redirects you to NotFound page', fakeAsync(() => { 
    router.navigate(['**']);
    tick(); 
    expect(location.path()).toBe('/404'); 
  }));
  

});
