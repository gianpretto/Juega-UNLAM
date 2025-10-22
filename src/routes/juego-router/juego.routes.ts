import {Router} from "express";
import { JuegoController } from "../../controllers/juego.controller.js";

const juegoRouter = Router();
const juegoController = new JuegoController();

juegoRouter.get('/',juegoController.getJuegos.bind(juegoController));
juegoRouter.get('/:id',juegoController.getJuegoPorId.bind(juegoController));
juegoRouter.delete('/:id',juegoController.eliminarJuego.bind(juegoController));



export default juegoRouter;