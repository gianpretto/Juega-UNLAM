import type { Usuario} from './usuario.model';
import type { Juego } from './juego.model';

export interface Wishlist {
  id: number;
  usuarioId: number;
  usuario?: Usuario;
  juegoId: number;
  juego?: Juego;
}