export interface JuegoRest{
    id:number,
    nombre:string,
    subtitulo:string,
    precio:number,
    descripcion:string,
    reviews?: Review[];
}




export type Review = {
    id: number;
    descripcion: string;
    valoracion : string;
}