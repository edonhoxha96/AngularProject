import { Model } from "./model";
import { Years } from "./years";

export interface Product{
    id: number,
    eurocode: string,
    image: string,
    years: Years,
    glassType: {
        id: number,
        name: string
    },
    tinting:{
        id: number,
        name: string
    },
    model:Model
}