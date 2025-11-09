import { Genero } from "./genero.interface";
import { Plataforma } from "./plataforma.interface";

export interface JuegoPlataformaGenero{
    id: number;
    nombre: string;
    subtitulo?: string;      // Opcional - puede no venir del backend
    precio: number;
    descripcion: string;
    desarrolladorId?: number;
    mainImagenId?: number;
    released?: string;       // Opcional - puede no venir del backend
    rating?: number;
    plataforma:Plataforma[];
    genero:Genero[];
}