import type { TipoUsuario } from "./tipo-usuario.model";
import type { Review } from "./review.model";
import type { UsuarioJuego } from "./usuario-juego.model";
import type { Wishlist } from "./wishlist.model";
import type { Carrito } from "./carrito.model";

export interface Usuario {
  id: number;
  email: string;
  password?: string; // opcional aquí; preferir DTO sin password
  nombre: string;
  apellido: string;
  direccion?: string | null;
  saldo: number;
  tipoUsuarioId: number;
  tipoUsuario?: TipoUsuario;
  reviews?: Review[];
  usuarioJuegos?: UsuarioJuego[];
  wishlists?: Wishlist[];
  carritos?: Carrito[];
}