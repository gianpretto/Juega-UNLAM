export interface Juego{
    id:number,
    nombre:string,
    subtitulo:string,
    precio:number,
    descripcion:string,
}


export interface Imagen{
    id: number,
    url: string,
    alt: string,
    orden: number,
    isMain: boolean,
    juegoId: number
}





export interface Review {
    id: number,
    descripcion: string,
    valoracion : string,
    expandida : boolean
}