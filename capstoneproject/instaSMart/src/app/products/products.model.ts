
export interface IProduct{
    id:string,
    name: string,
    brand: string,
    price: number,
    image: string,
    category: Category,
    rating: number,
    qty: number,
    description: string
    
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
