import type {Genero} from './genero.model';
import type {Desarrollador} from './desarrollador.model';
import type {Review} from './review.model';
import type {UsuarioJuego} from './usuario-juego.model';
import type {Wishlist} from './wishlist.model';
import type {CarritoJuego} from './carrito-juego.model';
import type {JuegoPlataforma} from './juego-plataforma.model';

export interface Juego {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  generoId: number;
  genero?: Genero;
  desarrolladorId: number;
  desarrollador?: Desarrollador;
  reviews?: Review[];
  usuarioJuegos?: UsuarioJuego[];
  wishlists?: Wishlist[];
  carritos?: CarritoJuego[];
  plataformas?: JuegoPlataforma[];
}