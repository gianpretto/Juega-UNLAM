import { Usuario } from "./usuario.model";
import { Juego } from "@interfaces/juego.interface";

export class Review {
  id!: number;
  descripcion?: string;
  usuarioId?: number;
  usuario?: Usuario;
  juegoId?: number;
  juego?: Juego;
}
