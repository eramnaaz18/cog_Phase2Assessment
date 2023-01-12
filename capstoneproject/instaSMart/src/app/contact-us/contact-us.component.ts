import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  titleMain='Contact Form';
  contactForm:FormGroup;
  stores: any = ['store1', 'store2', 'store3', 'store4'];


   constructor(private formBuilder:FormBuilder) {
    
    this.contactForm=this.formBuilder.group({
         
         firstname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20), Validators.pattern("^[A-Za-z]+$")]],
         lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20), Validators.pattern("^[A-Za-z]+$")]],
         store: ['', [Validators.required]],
         comments: ['',[Validators.required, Validators.minLength(50), Validators.maxLength(150)]]
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
  
    onSubmit(){
      console.log(this.contactForm.value);
    }

    resetForm() {
    
      this.contactForm.reset();
      console.log("Form has been reset")
     }
   
     changeStore(e: any) {
      this.store?.setValue(e.target.value, {
        onlySelf: true,
      });
    }

}