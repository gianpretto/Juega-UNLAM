import { TipoUsuario } from "@interfaces/tipo-usuario.interface";
import { Review } from "@interfaces/review.interface";
import { UsuarioJuego } from "@interfaces/usuario-juego.interface";
import { Wishlist } from "@interfaces/wishlist.interface";
import { Carrito } from "@interfaces/carrito.interface";

export interface UsuarioRest {
    id: number;
    email: string;
    password?: string;      // opcional, depende si el backend lo envía o no
    nombre?: string;
    apellido?: string;
    direccion?: string;
    saldo: number;
    tipoUsuarioId?: number;

    tipoUsuario?: TipoUsuario;
    reviews?: Review[];
    usuario_juegos?: UsuarioJuego[];
    wishlists?: Wishlist[];
    carritos?: Carrito[];
}
