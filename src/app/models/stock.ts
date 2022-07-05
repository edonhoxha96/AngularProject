import { NumberValueAccessor } from "@angular/forms";
import { Depot } from "./depot";
import { Product } from "./product";
import { ProductSupplier } from "./productsupplier";
import { Sector } from "./sector";
import { Supplier } from "./supplier";

export interface Stock{
    id: number,
    quantity: number,
    depot: Depot,
    productSupplier: ProductSupplier,
    sector: Sector
    // product: Product,
    // supplier: Supplier,
}