import { Usuario } from "@interfaces/usuario.interface";


export interface TipoUsuario {
  id: number;
  descripcion?: string;
  usuarios?: Usuario[];
}