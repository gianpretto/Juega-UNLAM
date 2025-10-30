export interface Juego{
    id:number,
    nombre:string,
    subtitulo:string,
    precio:number,
    descripcion:string,
    reviews?: Review[];
}


export interface Imagen{
    id: number,
    url: string,
    alt: string,
    orden: number,
    isMain: boolean,
    juegoId: number
}





export type Review = {
    id: number;
    descripcion: string;
    valoracion : string;
}