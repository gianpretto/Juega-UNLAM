import type { Usuario } from './index';

export interface TipoUsuario {
  id: number;
  descripcion: string;
  usuarios?: Usuario[]; // opcional; requiere importar Usuario desde index si se usa
}