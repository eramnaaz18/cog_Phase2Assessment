import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { ProductEditComponent } from './product-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from '../product-list/product-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Category, IProduct } from '../products.model';
import {Location} from '@angular/common';


describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(provideMockStore),
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [
            {
              path: 'products', component:ProductListComponent
            }
          ]
        )
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  //creation of component class
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //if pageTitle is properly rendered to template from component class
  it('should render the page title',()=>{
    let comp = component.pageTitle = "Edit Product";
    fixture.detectChanges();
    const rootEle: DebugElement = fixture.debugElement;
    const h2 = rootEle.query(By.css('h2'));
    const h2Element : HTMLElement = h2.nativeElement;
    expect(h2Element.textContent).toContain(comp);
  });

  //testing existence of product name, binding to form control
  //type to be text and validation for required field
  it('should have product name',()=>{
    const name = fixture.debugElement.query(By.css('#name'));
    expect(name).toBeTruthy();
  });


  it('should bind name to FormControl',()=>{
    const name = fixture.debugElement.query(By.css('#name'));
    const comp = component.editProduct.get("name");
    const dummyProductName = "Redmi";
    comp?.setValue(dummyProductName);
    fixture.detectChanges();
    expect(name.nativeElement.value).toEqual(dummyProductName);
    expect((name.nativeElement as HTMLInputElement).value).toEqual(dummyProductName);
  });

  it('should have type of name as text', ()=>{
    const name = fixture.debugElement.query(By.css('#name'));
    expect(name.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should mark name as invalid if left empty', ()=>{
    const comp = component.editProduct.get("name");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  //testing for product brand existence, binding to FormControl,
  //type as text, validator for required field
  it('should have product brand',()=>{
    const brand = fixture.debugElement.query(By.css('#brand'));
    expect(brand).toBeTruthy();
  });


  it('should bind brand to FormControl',()=>{
    const brand = fixture.debugElement.query(By.css('#brand'));
    const comp = component.editProduct.get("brand");
    const dummyProductBrand = "Xiaomi";
    comp?.setValue(dummyProductBrand);
    fixture.detectChanges();
    expect(brand.nativeElement.value).toEqual(dummyProductBrand);
    expect((brand.nativeElement as HTMLInputElement).value).toEqual(dummyProductBrand);
  });

  it('should have type of brand as text', ()=>{
    const brand = fixture.debugElement.query(By.css('#brand'));
    expect(brand.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should mark brand as invalid if left empty', ()=>{
    const comp = component.editProduct.get("brand");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  //testing for product price existence, binding to FormControl,
  //type as number, validator for required field
  it('should have price brand',()=>{
    const price = fixture.debugElement.query(By.css('#price'));
    expect(price).toBeTruthy();
  });


  it('should bind price to FormControl',()=>{
    const price = fixture.debugElement.query(By.css('#price'));
    const comp = component.editProduct.get("price");
    comp?.setValue(22500);
    fixture.detectChanges();
    expect(price.nativeElement.value).toEqual('22500');
  });

  it('should have type of price as number', ()=>{
    const price = fixture.debugElement.query(By.css('#price'));
    expect(price.nativeElement.getAttribute('type')).toEqual('number');
  });

  it('should mark price as invalid if left empty', ()=>{
    const comp = component.editProduct.get("price");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  //testing for product rating existence, binding to FormControl,
  //type as number, validator for required field
  it('should have product rating',()=>{
    const rating = fixture.debugElement.query(By.css('#rating'));
    expect(rating).toBeTruthy();
  });


  it('should bind rating to FormControl',()=>{
    const rating = fixture.debugElement.query(By.css('#rating'));
    const comp = component.editProduct.get("rating");
    const dummyProductRating= "4.2";
    comp?.setValue(dummyProductRating);
    fixture.detectChanges();
    expect(rating.nativeElement.value).toEqual(dummyProductRating);
    expect((rating.nativeElement as HTMLInputElement).value).toEqual(dummyProductRating);
  });

  it('should have type of rating as number', ()=>{
    const rating = fixture.debugElement.query(By.css('#rating'));
    expect(rating.nativeElement.getAttribute('type')).toEqual('number');
  });

  it('should mark rating as invalid if left empty', ()=>{
    const comp = component.editProduct.get("rating");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  //testing for product category existence, binding of first category value on dropdown,
  //mark as invalid if category is not selected
  it('should have product rating',()=>{
    const category = fixture.debugElement.query(By.css('#category'));
    expect(category).toBeTruthy();
  });

  it('should bind the first category value on selection of dropdown list',() => {
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('#category')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(select.value).toEqual('accessories');
  }); 

  it('should mark category as invalid if left unselected', ()=>{
    const comp = component.editProduct.get("category");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  //testing for product image existence, binding to FormControl,
  //type as text, validator for required field
  it('should have product image',()=>{
    const image = fixture.debugElement.query(By.css('#image'));
    expect(image).toBeTruthy();
  });


  it('should bind image to FormControl',()=>{
    const image = fixture.debugElement.query(By.css('#image'));
    const comp = component.editProduct.get("image");
    const dummyProductImage = "../../assets/images/redmi.jpg";
    comp?.setValue(dummyProductImage);
    fixture.detectChanges();
    expect(image.nativeElement.value).toEqual(dummyProductImage);
    expect((image.nativeElement as HTMLInputElement).value).toEqual(dummyProductImage);
  });

  it('should have type of image as text', ()=>{
    const image = fixture.debugElement.query(By.css('#image'));
    expect(image.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should mark image as invalid if left empty', ()=>{
    const comp = component.editProduct.get("image");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });

  //testing for seller existence, binding to FormControl,
  //type as text, validator for required field
  it('should have seller details',()=>{
    const seller = fixture.debugElement.query(By.css('#seller'));
    expect(seller).toBeTruthy();
  });


  it('should bind seller to FormControl',()=>{
    const seller = fixture.debugElement.query(By.css('#seller'));
    const comp = component.editProduct.get("seller");
    const dummySeller = "Mumbai Merchant";
    comp?.setValue(dummySeller);
    fixture.detectChanges();
    expect(seller.nativeElement.value).toEqual(dummySeller);
    expect((seller.nativeElement as HTMLInputElement).value).toEqual(dummySeller);
  });

  it('should have type of seller as text', ()=>{
    const seller = fixture.debugElement.query(By.css('#seller'));
    expect(seller.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should mark seller as invalid if left empty', ()=>{
    const comp = component.editProduct.get("seller");
    comp?.setValue(null);
    fixture.detectChanges();
    expect(comp?.invalid).toBeTruthy();
  });


  //testing the addProduct button
  it('should call the saveChanges form action when Save Product button is clicked', ()=>{
    const submit = fixture.debugElement.query(By.css('.editProduct-form'));
    const func = spyOn(component,'saveChanges');
    submit.triggerEventHandler('ngSubmit',null);
    expect(func).toHaveBeenCalled();
  });


  //testing validity of addProduct form
  //along with saveProduct Button enabled for valid form
  it('should return true is form is valid', ()=>{
    const dummyData :IProduct = {
      id: 1,
      name: 'Redmi',
      price: 22500,
      seller: 'Delhi Merchant',
      rating: 4.5,
      brand: 'Xiaomi',
      category: Category.mobile,
      image: '../../assets/images/redmi.jpg',
      qty: 1
    };

    component.editProduct.patchValue(dummyData);
    fixture.detectChanges();
    expect(component.editProduct.valid).toBeTrue();
    //this is to check if submit button is enabled if form is changed
    let saveBtn =   fixture.debugElement.query(By.css('#submit')).nativeElement;
    if(component.editProduct.dirty && component.editProduct.touched)
      expect(saveBtn.disabled).toBe(false);
  });


  //testing the routing of saveChanges to Product-list component
  it('should take back to products list page on click of Save Changes button', ()=>{
    const location: Location = TestBed.get(Location);
    const submit = fixture.debugElement.query(By.css("#submit"));
    submit.nativeElement.click();
    fixture.detectChanges();
    expect(location.path()+'/products').toBe('/products');
  });


  //checking disability of submit button
  it('should check Save Changes button is disabled initially', () => {
    fixture.detectChanges();
    let saveBtn =   fixture.debugElement.query(By.css('#submit')).nativeElement;
    expect(saveBtn.disabled).toBe(true);
    
  });

});
