import { Imagen } from "./image.interface";
import { JuegoPlataforma } from "./juego-plataforma.interface";
import { JuegoGenero } from "./juego-genero.interface";

export interface Juego {
    id: number;
    nombre: string;
    subtitulo?: string;      // Opcional - puede no venir del backend
    precio: number;
    descripcion: string;
    imagenes: string;
    desarrolladorId?: number;
    mainImagenId?: number;
    mainImagen?: Imagen;     // ← Objeto completo de la imagen principal
    released?: string;       // Opcional - puede no venir del backend
    rating?: number;         // Opcional - puede no venir del backend
    plataformas?: JuegoPlataforma[];  // ← Relación con plataformas (viene del backend biblioteca)
    juego_generos?: JuegoGenero[];    // ← Relación con géneros (viene del backend biblioteca)
}