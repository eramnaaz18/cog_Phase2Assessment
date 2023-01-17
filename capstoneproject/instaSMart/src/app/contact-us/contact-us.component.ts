import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  titleMain='Contact Form';
  contactForm:FormGroup;

  //this is displayed in the template as options of select list
  stores: any = ['store1', 'store2', 'store3', 'store4'];


   constructor(private formBuilder:FormBuilder, private router: Router) {
    
    //reactive form with validations
    this.contactForm=this.formBuilder.group({
         
         firstname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20), Validators.pattern("^[A-Za-z]+$")]],
         lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20), Validators.pattern("^[A-Za-z]+$")]],
         store: ['', [Validators.required]],
         comments: ['',[Validators.required, Validators.minLength(20), Validators.maxLength(150)]]
         })
  }

  get firstname(){
    return this.contactForm.get("firstname");
  }

  get lastname(){
    return this.contactForm.get("lastname");
  }
   
  get store() {
    return this.contactForm.get('store');
  }

  get comments(){
    return this.contactForm.get('comments');
  }

    ngOnInit(): void {
    }
  

    //after submitting form it should redirect to home page
    onSubmit(){
      console.log(this.contactForm.value);
      this.router.navigate(['']);
    }


    //resets the form value
    resetForm() {
    
      this.contactForm.reset();
      console.log("Form has been reset")
     }


     //for changing the selected option value
     changeStore(e: any) {
      this.store?.setValue(e.target.value, {
        onlySelf: true,
      });
    }

}
