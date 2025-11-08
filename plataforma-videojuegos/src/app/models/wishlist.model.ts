import { Usuario } from "./usuario.model";
import { Juego } from "./juego.model";

export class Wishlist {
  id!: number;

  usuarioId?: number;
  usuario?: Usuario;

  juegoId?: number;
  juego?: Juego;
}
