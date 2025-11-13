import { Imagen } from "./image.interface";

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
}