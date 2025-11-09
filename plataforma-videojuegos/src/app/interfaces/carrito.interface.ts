import {Usuario} from "@interfaces/usuario.interface"
import {CarritoJuego} from "@interfaces/carrito-juego.interface"

export interface Carrito {
  id: number;
  usuarioId?: number;
  usuario?: Usuario;
  juegos?: CarritoJuego[];
}