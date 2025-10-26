import type { Usuario } from './usuario.model';
import type { Juego } from './juego.model';

export interface UsuarioJuego {
  id: number;
  detalle: string;
  fecha: string | Date; // el backend puede devolver ISO string
  usuarioId: number;
  usuario?: Usuario;
  juegoId: number;
  juego?: Juego;
}