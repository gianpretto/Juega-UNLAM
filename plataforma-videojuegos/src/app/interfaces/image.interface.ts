export interface Imagen{
    id: number,
    url: string,
    alt: string,
    orden: number,
    isMain: boolean,
    juegoId: number
}


// export interface Imagen {
//   id: number;
//   url?: string;
//   alt?: string;
//   orden: number;
//   isMain: boolean;
//   juegoId?: number;
//   juego?: Juego;
//   mainJuego?: Juego;
// }