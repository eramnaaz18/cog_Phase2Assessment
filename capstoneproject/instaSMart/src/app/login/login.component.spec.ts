import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import {Location} from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let service: AuthService;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AuthService);

  });

  //testing creation of component class
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //testing presence of auth service
 it('should have auth service',()=>{
    expect(service).toBeTruthy();
  })
  
  //testcases for userName
  it('should have userName',()=>{
    const el = fixture.debugElement.query(By.css('#userName'));
    expect(el).toBeTruthy();
  });


  it('should have type as text for userName',()=>{
    const el = fixture.debugElement.query(By.css('#userName'));
    expect(el.nativeElement.getAttribute('type')).toEqual('text');
  });


  it('should have name as userName',()=>{
    const el = fixture.debugElement.query(By.css('#userName'));
    expect(el.nativeElement.getAttribute('name')).toEqual('userName');
  });

  //testcases for password
  it('should have password',()=>{
    const el = fixture.debugElement.query(By.css('#password'));
    expect(el).toBeTruthy();
  });

  it('should have type as password for password',()=>{
    const el = fixture.debugElement.query(By.css('#password'));
    expect(el.nativeElement.getAttribute('type')).toEqual('password');
  });


  it('should have name as password',()=>{
    const el = fixture.debugElement.query(By.css('#password'));
    expect(el.nativeElement.getAttribute('name')).toEqual('password');
  });



  //testing submit button
  it('should submit the form when login button is clicked',()=>{
    const btnEle = fixture.debugElement.query(By.css('#login'));
    const func = spyOn(component,'onSubmit');
    (btnEle.nativeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(func).toHaveBeenCalled();

  });

  //initial input of login form should be empty
  it('should check initial input', () => {
    let userName = fixture.debugElement.query(By.css('#userName')).nativeElement;
    let password = fixture.debugElement.query(By.css('#password')).nativeElement;
    fixture.detectChanges();
    expect(userName.value).toBe('');
    expect(password.value).toBe('');
  });


  //check disabled button at initial stage
  it('should check loginBtn is disabled initially', () => {
    fixture.detectChanges();
    let loginBtn =   fixture.debugElement.query(By.css('#login')).nativeElement;
    expect(loginBtn.disabled).toBe(true);
  });


  //test validation of user when username and password entered
  it('should validate the user', () => {
    let valid = spyOn(service, 'validateUser').and.returnValue(true);
    service.login('eram','user');
    let users:User[] = [
      {
        id:1,
        userName: 'eram',
        password: 'user',
        isAdmin: false
      }
    ]
    service.validateUser('eram',users);
    expect(valid).toHaveBeenCalled();
  });


});
