import { Juego } from "@interfaces/juego.interface";


export interface Desarrollador {
  id: number;
  nombre?: string;
  juegos?: Juego[];
}