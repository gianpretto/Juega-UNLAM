/**
 * Modelo que representa la relación muchos a muchos entre Juego y Plataforma
 */
export interface JuegoPlataforma {
  id: number;
  fkIdJuego: number; // Foreign Key a Juego
  fkIdPlataforma: number; // Foreign Key a Plataforma
}
