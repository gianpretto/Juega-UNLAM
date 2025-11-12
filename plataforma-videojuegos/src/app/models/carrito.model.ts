import { Usuario } from "./usuario.model";
import { CarritoJuego } from "./carrito-juego.model";

export class Carrito {
  id!: number;
  usuarioId?: number;
  usuario?: Usuario;
  juegos?: CarritoJuego[];
}
