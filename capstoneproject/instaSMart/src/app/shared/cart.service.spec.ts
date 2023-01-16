import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category, IProduct } from '../products/products.model';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.cartItemList = [
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
    },
    {
      id: 3, 
      name: "Blue Faded Jeans", 
      brand: "Moda Rapido", 
      price: 2500, 
      image:"../../assets/images/blue.jpg",
      category:Category.clothing, 
      rating: 3.0, 
      qty: 1,
      seller:"Delhi Merchant"
    }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to cart', ()=>{
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

  service.addtoCart(prod1);
  let cart = service.cartItemList = [...service.cartItemList,prod1]
  expect(cart.length).toEqual(3);
  });


  it('should remove single item from the cart', ()=>{
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
    let cart = service.cartItemList = [...service.cartItemList,prod1]
    service.removeCartItem(prod1);
    expect(cart.length).toEqual(2);
  });



  it('should remove all items in the cart', ()=>{
    service.removeAllCart();
    expect(service.cartItemList.length).toEqual(0);
  });


  it('should give total price of items in the cart', ()=>{
    let totalAmount = service.getTotalPrice();
    expect(totalAmount).toEqual(10500);
  })
});
