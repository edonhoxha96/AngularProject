import { Depot } from "./depot";
import { Product } from "./product";
import { ProductSupplier } from "./productsupplier";
import { Sector } from "./sector";

export interface Sales{
    id:number,
    quantity:number,
    sellingPrice: number,
    depot: Depot,
    sector: Sector,
    productSupplier: ProductSupplier,
    costumer:{
        id:number
    },
    created: Date,
    updated: Date,
}