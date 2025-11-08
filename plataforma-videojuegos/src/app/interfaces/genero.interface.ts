import { JuegoGenero } from "@interfaces/juego-genero.interface";



export interface Genero {
  id: number;
  nombre?: string;
  juego_generos?: JuegoGenero[];
}