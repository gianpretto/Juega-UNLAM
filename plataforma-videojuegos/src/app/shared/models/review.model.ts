import type {Usuario} from './usuario.model';
import type {Juego} from './juego.model';

export interface Review {
  id: number;
  descripcion: string;
  usuarioId: number;
  usuario?: Usuario;
  juegoId: number;
  juego?: Juego;
}