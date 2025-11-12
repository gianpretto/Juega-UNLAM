import { Usuario } from "@interfaces/usuario.interface";
import { UsuarioRest } from "@rest/usuario.rest";

export class UsuarioMapper {
    static mapRestUsuarioToUsuario(usuarioRest: UsuarioRest): Usuario {
        return {
            id: usuarioRest.id,
            email: usuarioRest.email,
            nombre: usuarioRest.nombre,
            apellido: usuarioRest.apellido,
            direccion: usuarioRest.direccion,
            saldo: usuarioRest.saldo,
            tipoUsuarioId: usuarioRest.tipoUsuarioId,
            tipoUsuario: usuarioRest.tipoUsuario,
            reviews: usuarioRest.reviews,
            usuario_juegos: usuarioRest.usuario_juegos,
            wishlists: usuarioRest.wishlists,
            carritos: usuarioRest.carritos,
            password: usuarioRest.password ?? '' // Asignar cadena vacía si es undefined
        };
    }

    static mapRestUsuarioArrayToUsuarioArray(usuarioRestArray: UsuarioRest[]): Usuario[] {
        return usuarioRestArray.map(this.mapRestUsuarioToUsuario);
    }
}
