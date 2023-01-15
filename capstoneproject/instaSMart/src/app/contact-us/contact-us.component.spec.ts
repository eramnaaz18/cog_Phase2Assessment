import { ComponentFixture,TestBed } from '@angular/core/testing';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Location} from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [
            {
              path: '', component:HomeComponent
            }
          ]
        )
      ]
    })
    .compileComponents();

   

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have firstname',()=>{
    const firstName = fixture.debugElement.query(By.css('#firstname'));
    expect(firstName).toBeTruthy();
  });

  it('should bind firstname to FormControl',()=>{
    const firstName = fixture.debugElement.query(By.css('#firstname'));
    const comp = component.contactForm.get("firstname");
    const dummyFirstName = "Eram";
    comp?.setValue(dummyFirstName);
    fixture.detectChanges();
    expect(firstName.nativeElement.value).toEqual(dummyFirstName);
    expect((firstName.nativeElement as HTMLInputElement).value).toEqual(dummyFirstName);
  });

  
  it('should have type of firstname as text', ()=>{
    const firstName = fixture.debugElement.query(By.css('#firstname'));
    expect(firstName.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should mark firstname as invalid if left empty', ()=>{
    const comp = component.contactForm.get("firstname");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });

  it('should check min length of firstname',()=>{
    const comp = component.contactForm.get("firstname");
    comp?.setValue("Ro");
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  it('should check max length of firstname',()=>{
    const comp = component.contactForm.get("firstname");
    comp?.setValue("Chaudhury Sen Gupta Roy");
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  it('should check pattern of alphabets for firstname',()=>{
    const comp = component.contactForm.get("firstname");
    comp?.setValue("12abc");
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  it('should have lastname', ()=>{
    const lastName = fixture.debugElement.query(By.css('#lastname'));
    expect(lastName).toBeTruthy();
  });

  it('should have type of lastname as text', ()=>{
    const lastName = fixture.debugElement.query(By.css('#lastname'));
    expect(lastName.nativeElement.getAttribute('type')).toEqual('text');
  });


  it('should bind the first store value on selection of dropdown list',() => {
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('#store')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(select.value.substring(3)).toEqual('store1');
  }); 

  it('should render total 4 stores + 1 default option',()=>{
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('#store')).nativeElement;
    let comp = component.stores;
    comp = select;
    fixture.detectChanges();
    const opt1 = fixture.debugElement.queryAll(By.css('#store option'));
    expect(opt1.length).toEqual(select.length);
  });

  it('should mark stores as invalid if left unselected', ()=>{
    const comp = component.contactForm.get("store");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  it('should mark stores as valid if it has value', ()=>{
    const comp = component.contactForm.get("store");
    comp?.setValue('store1');
    fixture.detectChanges();
    expect(comp?.valid).toBeTruthy();
  })


  it('should bind comments', ()=>{
    const comments = fixture.debugElement.query(By.css('#comments'));
    expect(comments).toBeTruthy();
  });


 
  it('should have type of comments as text', ()=>{
    const comments: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();      
    expect(comments.type).toBe('textarea')
  });

  it('should call the submit form action when submit button is clicked', ()=>{
    const submit = fixture.debugElement.query(By.css('.contact-form'));
    const func = spyOn(component,'onSubmit');
    submit.triggerEventHandler('ngSubmit',null);
    expect(func).toHaveBeenCalled();
  });

  it('should return true is form is valid', ()=>{
    const dummyData = {
      firstname: 'Eram',
      lastname: 'Naaz',
      store: 'store1',
      comments: 'Nice purchase would love to order more'
    };

    component.contactForm.patchValue(dummyData);
    fixture.detectChanges();
    expect(component.contactForm.valid).toBeTrue();
  });


  it('should take back to home page on click of submit button', ()=>{
    const location: Location = TestBed.get(Location);
    const submit = fixture.debugElement.query(By.css("#submit"));
    submit.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('');
    })
});



});
