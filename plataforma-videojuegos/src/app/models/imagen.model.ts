export interface Imagen {
  id: number;
  url: string;
  idJuego: number; // <-- FK al juego
}
