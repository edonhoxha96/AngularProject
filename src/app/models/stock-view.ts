import { Depot } from "./depot";
import { Product } from "./product";
import { Supplier } from "./supplier";

export interface StockView{
    id: number,
    quantity: number,
    quantity2: number,
    depot: Depot,
    depot2: Depot | null,
    product: Product,
    supplier: Supplier,
    supplier2: Supplier | null
}