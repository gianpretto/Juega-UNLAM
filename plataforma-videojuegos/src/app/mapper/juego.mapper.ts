import { Juego } from "@interfaces/juego.interface"
import { JuegoRest } from "@rest/juego.rest"

export class JuegoMapper{
    static mapRestJuegoToJuego(juegoRest:JuegoRest):Juego{
        return {
            id : juegoRest.id,
            nombre : juegoRest.nombre,
            subtitulo : juegoRest.subtitulo,
            descripcion : juegoRest.descripcion,
            precio : juegoRest.precio,
        }
    }

    static mapRestJuegoArrayToJuegoArray(juegoRestArray:JuegoRest[]):Juego[]{
        return juegoRestArray.map(this.mapRestJuegoToJuego)
    }
}