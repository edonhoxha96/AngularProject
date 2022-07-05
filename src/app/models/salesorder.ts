import { Status } from "./status";

export interface SalesOrder{
    id:number,
    description: string,
    quantity: number,
    product: {
        id:number
    },
    costumer: {
        id:number
        firstName:string
    },
    status:Status
}