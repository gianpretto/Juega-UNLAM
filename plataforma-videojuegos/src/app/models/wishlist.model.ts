import { Usuario } from "./usuario.model";
import { Juego } from "@interfaces/juego.interface";

export class Wishlist {
  id!: number;

  usuarioId?: number;
  usuario?: Usuario;

  juegoId?: number;
  juego?: Juego;
}
