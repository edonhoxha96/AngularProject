export interface Purchases{
    id:number,
    quantity:number,
    buyingPrice: number,
    depot:{
        id:number
    },
    product:{
        id:number
    },
    supplier:{
        id:number
    }
}