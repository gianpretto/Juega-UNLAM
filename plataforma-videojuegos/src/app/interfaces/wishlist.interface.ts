import { Usuario } from "@interfaces/usuario.interface";
import { Juego } from "@interfaces/juego.interface";

export interface Wishlist {
  id: number;
  usuarioId?: number;
  usuario?: Usuario;
  juegoId?: number;
  juego?: Juego;
}