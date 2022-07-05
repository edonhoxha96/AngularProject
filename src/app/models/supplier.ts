import { City } from "./city";

export interface Supplier{
    id:number,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    description: string,
    city: City
}