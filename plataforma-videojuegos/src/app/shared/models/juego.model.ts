import { Desarrollador } from './desarrollador.model';
import { Plataforma } from './plataforma.model';
import { Genero } from './genero.model';
import { Review } from '../../modules/juego/interfaces/juego.interface';

/**
 * Modelo principal que representa un Juego
 * Incluye las relaciones con otras entidades
 */
export interface Juego {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  codigoGen: number;
  fkIdDesa: number; // Foreign Key a Desarrollador

  // Propiedades opcionales para las relaciones populadas (cuando el backend las incluya)
  desarrollador?: Desarrollador;
  plataformas?: Plataforma[];
  generos?: Genero[];
  imagenes: string[]; // URLs de imágenes del juego
  reviews?: Review[];
}
