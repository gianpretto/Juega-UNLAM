import type {Carrito} from './carrito.model';
import type {Juego} from './juego.model';

export interface CarritoJuego {
  id: number;
  carritoId: number;
  carrito?: Carrito;
  juegoId: number;
  juego?: Juego;
}