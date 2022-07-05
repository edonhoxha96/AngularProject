import { Product } from "./product";
import { Supplier } from "./supplier";

export interface ProductSupplier{
    id:number,
    buyingPrice: number,
    sellingPrice: number,
    product: Product,
    supplier: Supplier
}