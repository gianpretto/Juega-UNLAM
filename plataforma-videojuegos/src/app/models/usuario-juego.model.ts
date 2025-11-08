import { Usuario } from "./usuario.model";
import { Juego } from "./juego.model";

export class UsuarioJuego {
  id!: number;
  detalle?: string;
  fecha: Date = new Date();

  usuarioId?: number;
  usuario?: Usuario;

  juegoId?: number;
  juego?: Juego;
}
