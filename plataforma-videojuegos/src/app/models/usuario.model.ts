
import { Carrito } from "./carrito.model";
import { Review } from "./review.model";
import { TipoUsuario } from "./tipo-usuario.model";
import { UsuarioJuego } from "./usuario-juego.model";
import { Wishlist } from "./wishlist.model";

export interface Usuario {
    id?: number;
    email: string;
    password: string;
    nombre?: string;
    apellido?: string;
    direccion?: string;
    saldo?: number;
    tipoUsuarioId?: number;
    tipoUsuario?: TipoUsuario;
    reviews?: Review[];
    usuario_juegos?: UsuarioJuego[];
    wishlists?: Wishlist[];
    carritos?: Carrito[];
}