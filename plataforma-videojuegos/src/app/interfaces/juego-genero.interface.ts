import { Juego } from "@interfaces/juego.interface";
import { Genero } from "@interfaces/genero.interface";



export interface JuegoGenero {
  id: number;
  detalle?: string;
  juegoId?: number;
  juego?: Juego;
  generoId?: number;
  genero?: Genero;
}