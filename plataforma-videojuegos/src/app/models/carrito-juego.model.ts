import { Juego } from "./juego.model";
import { Carrito } from "./carrito.model";


export class CarritoJuego {
  id!: number;
  carritoId?: number;
  carrito?: Carrito;

  juegoId?: number;
  juego?: Juego;
}
