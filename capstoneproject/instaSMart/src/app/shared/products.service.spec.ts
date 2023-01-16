import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Category, IProduct } from 'src/app/products/products.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('ProductsService', () => {
  let service: ProductsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let prod: IProduct[] = [];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],

      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    injector = getTestBed();

    prod =[
      {
        id: 1, 
        name: "Redmi",
        brand: "Xiaomi", 
        price: 12500, 
        image:"../../assets/images/redmi.jpg",
        category:Category.mobile, 
        rating: 4.2, 
        qty: 1,
        seller:"Delhi Merchant"
    },
    {
        id: 2,
        name: "Galaxy J8",
        brand: "Samsung",
        price: 8000, 
        image:"../../assets/images/samsung.jpg", 
        category:Category.mobile,
        rating: 4.5,
        qty: 1,
       seller:"Delhi Merchant"
    }
    ];

    httpMock = injector.get(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProducts()', inject([HttpTestingController,ProductsService],
  (httpMock:HttpTestingController,service: ProductsService) => {
      service.getProducts().subscribe(resp => expect (prod).toEqual(resp));
      const mockReq = httpMock.expectOne(service.url);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(prod);
      httpMock.verify();
    }
  ));


  it('should make use of createProduct() to create a new product', ()=>{
    let prod1 :IProduct = {
      id: 4, 
      name: "Blue Faded Jeans", 
      brand: "Moda Rapido", 
      price: 2500, 
      image:"../../assets/images/blue.jpg",
      category:Category.clothing, 
      rating: 3.0, 
      qty: 1,
      seller:"Delhi Merchant"
  };

prod = [...prod,prod1];

service.createProduct(prod1).subscribe(resp => {
  expect(resp).toEqual(prod1);
});

expect(prod.length).toEqual(3);

const req = httpMock.expectOne(service.url);
expect(req.request.method).toBe('POST');
req.flush(prod1);

});

it('should get product by id when getProductById() called', ()=>{
  
  let product = {
    id: 3, 
    name: "Blue Faded Jeans", 
    brand: "Moda Rapido", 
    price: 2500, 
    image:"../../assets/images/blue.jpg",
    category:Category.clothing, 
    rating: 3.0, 
    qty: 1,
    seller:"Delhi Merchant"
  };

  const func = spyOn(service, 'getProductById').and.returnValue(product);
  service.getProductById(3);
  expect(func).toHaveBeenCalled();

  });


  it('should update product when updateProduct() called', ()=>{
    let product = {
      id: 1, 
      name: "Redmi",
      brand: "Xiaomi", 
      price: 12500, 
      image:"../../assets/images/redmi.jpg",
      category:Category.mobile, 
      rating: 3.8, 
      qty: 1,
      seller:"Bangalore Merchant"
  };

  service.updateProduct(product).subscribe(
    resp => expect(resp).toEqual(product)
  );

  const req = httpMock.expectOne(`${service.url}/${product.id}`);

  expect(req.request.method).toBe('PUT');
  req.flush({product});

  });


  it('should delete product when deleteProduct() called', ()=>{
    service.deleteProduct(1).subscribe(
      resp => expect(resp).toEqual(1)
    );
  
    const req = httpMock.expectOne(`${service.url}/1`);
  
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpMock.verify();
  })

});
