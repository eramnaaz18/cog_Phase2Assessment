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
        "id": 1, 
        "name": "Redmi",
        "brand": "Xiaomi", 
        "price": 12500, 
        "image":"../../assets/images/redmi.jpg",
        "category":Category.mobile, 
        "rating": 4.2, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
        "id": 2,
        "name": "Galaxy J8",
        "brand": "Samsung",
        "price": 8000, 
        "image":"../../assets/images/samsung.jpg", 
        "category":Category.mobile,
        "rating": 4.5,
        "qty": 1,
        "seller":"Delhi Merchant"
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

});
