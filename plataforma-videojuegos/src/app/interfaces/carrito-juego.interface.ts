import { Carrito } from "@interfaces/carrito.interface";
import { Juego } from "@interfaces/juego.interface";


export interface CarritoJuego {
  id: number;
  carritoId?: number;
  carrito?: Carrito;
  juegoId?: number;
  juego?: Juego;
}