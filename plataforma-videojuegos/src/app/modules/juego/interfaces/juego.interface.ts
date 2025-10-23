export type JuegoDetalle = {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenes: string[];
    reviews?: Review[];
}

export type Review = {
    id: number;
    descripcion: string;
    valoracion : string;
}