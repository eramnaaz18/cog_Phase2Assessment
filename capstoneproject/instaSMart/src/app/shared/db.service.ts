import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IProduct, Category } from 'src/app/products/products.model';
import { User } from 'src/app/user/user';

@Injectable({
  providedIn: 'root'
})
export class DbService implements InMemoryDbService{

  //createDb() method being used to create in memory db of products[] and users[]
  createDb(){

    //products[]
    const products: IProduct[]=[
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
    },
    {
        "id": 3,
        "name": "Yellow Top", 
        "brand": "Vero Moda", 
        "price": 1000, 
        "image":"../../assets/images/yellow.jpg", 
        "category":Category.clothing,
        "rating": 4, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
        "id": 4, 
        "name": "Blue Faded Jeans", 
        "brand": "Moda Rapido", 
        "price": 2500, 
        "image":"../../assets/images/blue.jpg",
        "category":Category.clothing, 
        "rating": 3.0, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
        "id":5, 
        "name": "Earphones", 
        "brand": "BoAt", 
        "price": 1599, 
        "image":"../../assets/images/ear.jpg",
        "category":Category.accessories, 
        "rating": 2.8, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
        "id": 6, 
        "name": "ThinkPad", 
        "brand": "Lenovo", 
        "price": 45000, 
        "image":"../../assets/images/lenovo.jpg", 
        "category":Category.electronics, 
        "rating": 4.5, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
        "id": 7, 
        "name": "BP Monitor", 
        "brand": "Dr Morepen", 
        "price": 2500, 
        "image":"../../assets/images/bp.jpg", 
        "category":Category.healthDevices, 
        "rating": 3.5, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
        "id": 8, 
        "name": "Thermometer", 
        "brand": "HealthLine", 
        "price": 350, 
        "image":"../../assets/images/thermo.jpg", 
        "category":Category.healthDevices, 
        "rating": 3.8, 
        "qty": 1,
        "seller":"Delhi Merchant"
    },
    {
      "id": 9, 
      "name": "Muesli", 
      "brand": "Kellogg's", 
      "price": 350, 
      "image":"../../assets/images/kelloggs.jpg", 
      "category":Category.foodItem, 
      "rating": 4.5, 
      "qty": 1,
      "seller":"Mumbai Retail"
  }
    ]

    //set of users that we need for login
     const users: User[]=[
      {
        "id":1,
        "userName":"admin",
        "password":"admin",
        "isAdmin":true
      },
      {
        "id":2,
        "userName":"eram",
        "password":"user",
        "isAdmin":false    
    }] 

    

    return {products, users};
  }
}
