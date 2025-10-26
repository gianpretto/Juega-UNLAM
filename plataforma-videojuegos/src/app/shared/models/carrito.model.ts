import type { Usuario } from './usuario.model';
import type { CarritoJuego } from './carrito-juego.model';

export interface Carrito {
  id: number;
  usuarioId: number;
  usuario?: Usuario;
  juegos?: CarritoJuego[];
}