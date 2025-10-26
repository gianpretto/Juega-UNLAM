import type { JuegoPlataforma } from "./juego-plataforma.model";

export interface Plataforma {
  id: number;
  nombre: string;
  juegos?: JuegoPlataforma[];
}