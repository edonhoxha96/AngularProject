export interface GlassModelYear{
    id: number,
    product:{
        id: number,
        name: string,
    },
    model:{
        id: number,
        name: string
    },
    productionYear:{
        id: number,
        name: string
    }
}