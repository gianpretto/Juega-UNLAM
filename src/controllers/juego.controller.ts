import { type Request, type Response } from "express";
import { JuegoService } from "../services/juego.service.js";
import { JuegoRepository } from "../repository/juego.repository.js";

const juegoRepository = new JuegoRepository();
const juegoService = new JuegoService(juegoRepository);

export class JuegoController{
    constructor(){}

public getJuegos = async(req: Request, res:Response)=>{
    try {
        const juegos =  await juegoService.obtenerJuegos();
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener juegos", error })
    }
}
public getJuegoPorId = async(req: Request, res:Response)=>{
    try {
        const id = Number(req.params.id);
          if (isNaN(id)) {
                return res.status(400).json("ID inválido")
            }
        const juego =  await juegoService.obtenerJuegoPorId(id);
        res.status(200).json(juego);
    }catch (error) {
        res.status(500).json({ message: "Error al obtener juego por ID", error })
    }

}
public eliminarJuego = async(req: Request, res:Response)=>{
    try {
        const id = Number(req.params.id);
          if (isNaN(id)) {
                return res.status(400).json("ID inválido")
            }
        await juegoService.eliminarJuego(id);
        res.status(200).json({ message: "Juego eliminado correctamente" });
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar juego", error })
    }



}}