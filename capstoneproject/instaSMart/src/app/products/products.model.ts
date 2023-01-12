
export interface IProduct{
    id:number,
    name: string,
    brand: string,
    price: number,
    image: string,
    category: Category,
    rating: number,
    qty: number,
    seller: string
    
}


export enum Category{
    mobile="mobile",
    electronics="electronics",
    clothing="clothing",
    accessories="accessories",
    healthDevices="health devices",
    homeAppliances = "home appliances",
    foodItem = "food item",
    groceries ="groceries"

}
