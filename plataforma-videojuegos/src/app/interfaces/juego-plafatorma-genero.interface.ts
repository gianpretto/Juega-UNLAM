import { Genero } from "./genero.interface";
import { Plataforma } from "./plataforma.interface";

export interface JuegoPlataformaGenero{
    id: number;
    nombre: string;
    subtitulo?: string;
    precio: number;
    descripcion: string;
    imagenes: string;
    desarrolladorId?: number;
    mainImagenId?: number;
    released?: string;
    rating?: number;
    plataforma:Plataforma[];
    genero:Genero[];
}