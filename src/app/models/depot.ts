import { City } from "./city";

export interface Depot{
    id: number, 
    name: string,
    address: string,
    city: City
}