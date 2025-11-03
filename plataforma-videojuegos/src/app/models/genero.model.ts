/**
 * Modelo que representa un Género de videojuego
 */
export interface Genero {
  id: number;
  nombre: string;
  descripcion: string;
  fkIdJuego: number; // Foreign Key a Juego
}
