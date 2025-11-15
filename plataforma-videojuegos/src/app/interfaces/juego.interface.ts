import { Imagen } from "./image.interface";
import { JuegoPlataforma } from "./juego-plataforma.interface";
import { JuegoGenero } from "./juego-genero.interface";

export interface Juego {
    id: number;
    nombre: string;
    subtitulo?: string;      
    precio: number;
    descripcion: string;
    imagenes: string;
    desarrolladorId?: number;
    mainImagenId?: number;
    mainImagen?: Imagen;    
    released?: string;       
    rating?: number;       
    plataformas?: JuegoPlataforma[]; 
    juego_generos?: JuegoGenero[];   
}