import { Usuario } from "./usuario.model";

export class TipoUsuario {
  id!: number;
  descripcion?: string;
  usuarios?: Usuario[];
}
