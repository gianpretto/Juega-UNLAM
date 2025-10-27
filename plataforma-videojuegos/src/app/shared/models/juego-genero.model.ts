import type { Juego } from './juego.model';
import type { Genero } from './genero.model';

export interface JuegoGenero {
  id: number;
  detalle?: string | null;
  juegoId: number;
  juego?: Juego;
  generoId: number;
  genero?: Genero;
}
