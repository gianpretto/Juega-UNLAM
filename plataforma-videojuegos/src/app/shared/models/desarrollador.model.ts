import type {Juego} from './juego.model';

export interface Desarrollador {
  id: number;
  nombre: string;
  juegos?: Juego[];
}