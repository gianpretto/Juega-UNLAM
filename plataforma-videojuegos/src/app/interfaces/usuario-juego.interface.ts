import { Usuario } from "@interfaces/usuario.interface";
import { Juego } from "@interfaces/juego.interface";


export interface UsuarioJuego {
  id: number;
  detalle?: string;
  fecha: Date;
  usuarioId?: number;
  usuario?: Usuario;
  juegoId?: number;
  juego?: Juego;
}