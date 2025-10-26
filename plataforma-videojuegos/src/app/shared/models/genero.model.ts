import type { Juego } from './juego.model';

export interface Genero {
  id: number;
  nombre: string;
  juegos?: Juego[];
}