import type { Juego } from "./juego.model";
import type { Plataforma } from "./plataforma.model";

export interface JuegoPlataforma {
  id: number;
  juegoId: number;
  juego?: Juego;
  plataformaId: number;
  plataforma?: Plataforma;
}