import { Status } from "./status";

export interface PurchasesOrder{
    id:number,
    description: string,
    quantity: number,
    product: {
        id:number
    },
    supplier: {
        id:number,
        firstName:string
    },
    status:Status
}