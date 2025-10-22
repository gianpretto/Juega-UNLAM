import {} from "express";
import { JuegoService } from "../services/juego.service.js";
import { JuegoRepository } from "../repository/juego.repository.js";
const juegoRepository = new JuegoRepository();
const juegoService = new JuegoService(juegoRepository);
export class JuegoController {
    constructor() { }
    getJuegos = async (req, res) => {
        try {
            const juegos = await juegoService.obtenerJuegos();
            res.status(200).json(juegos);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener juegos", error });
        }
    };
    getJuegoPorId = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const juego = await juegoService.obtenerJuegoPorId(id);
            res.status(200).json(juego);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener juego por ID", error });
        }
    };
}
//# sourceMappingURL=juego.controller.js.map