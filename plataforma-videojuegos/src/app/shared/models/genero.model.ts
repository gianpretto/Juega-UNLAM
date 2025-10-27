import type { JuegoGenero } from './juego-genero.model';

export interface Genero {
  id: number;
  nombre: string;
  juegoGeneros?: JuegoGenero[];
}