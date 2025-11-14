export type CardVM = {
  id: number;
  nombre: string;
  precio: number;

  // IMAGEN PRINCIPAL
  imagen: string;         // lo que usa la card
  coverUrl?: string;      // viene del backend

  // OFERTAS
  descuento?: number;     // alias genérico
  discount?: number;      // backend puede enviarlo así
  finalPrice?: number;    // precio con descuento

  // VARIOS
  imagenes?: string[];
  rating?: number;
  tags?: string[];
};

export type ReviewVM = {
  id: number;
  usuarioId: number;
  puntaje: number;      // 1..10 ó 1..5
  comentario?: string;
  fecha?: string;
};