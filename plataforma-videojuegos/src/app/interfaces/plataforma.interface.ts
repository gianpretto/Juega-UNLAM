import { JuegoPlataforma } from "@interfaces/juego-plataforma.interface";



export interface Plataforma {
  id: number;
  nombre?: string;
  juegos?: JuegoPlataforma[];
}