export interface Juego {
    id: number;
    nombre: string;
    subtitulo?: string;      // Opcional - puede no venir del backend
    precio: number;
    descripcion: string;
    imagenes: string;
    desarrolladorId?: number;
    mainImagenId?: number;
    released?: string;       // Opcional - puede no venir del backend
    rating?: number;         // Opcional - puede no venir del backend
}