import { Usuario } from "@interfaces/usuario.interface";
import { Juego } from "@interfaces/juego.interface";

export interface Review {
  id: number;
  valoracion?: string;
  descripcion?: string;
  usuarioId?: number;
  usuario?: Usuario;
  juegoId?: number;
  juego?: Juego;
  expandida: boolean;
}