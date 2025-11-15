import { Genero } from "./genero.interface";
import { Plataforma } from "./plataforma.interface";
import { Imagen } from "./image.interface";

export interface JuegoPlataformaGenero{
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
    plataforma:Plataforma[];
    genero:Genero[];

    
}