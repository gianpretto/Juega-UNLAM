import { Juego } from "@interfaces/juego.interface";
import { Plataforma } from "@interfaces/plataforma.interface";



export interface JuegoPlataforma {
  id: number;
  juegoId?: number;
  juego?: Juego;
  plataformaId?: number;
  plataforma?: Plataforma;
}