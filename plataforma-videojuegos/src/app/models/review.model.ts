import { Usuario } from "./usuario.model";
import { Juego } from "./juego.model";

export class Review {
  id!: number;
  descripcion?: string;
  usuarioId?: number;
  usuario?: Usuario;
  juegoId?: number;
  juego?: Juego;
}
