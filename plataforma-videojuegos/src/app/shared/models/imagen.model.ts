import type { Juego } from "./juego.model";

export interface Imagen {
  id: number;
  url: string;
  alt?: string | null;
  orden: number;
  isMain: boolean;
  creadoAt: string; // ISO string
  updatedAt: string; // ISO string
  juegoId: number;
  // relación opcional al juego (import type para evitar side-effects en tiempo de ejecución)
  juego?: Juego | null;
  // relación inversa a mainJuego (opcional)
  mainJuego?: Juego | null;
}