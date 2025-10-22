import { Router } from "express";
import { JuegoController } from "../controllers/juego.controller.js";
//import empleadoRouter from "./empleado-router/empleado.routes.js";
import juegoRouter from "./juego-router/juego.routes.js";
export class AppRoutes {
    static get routes() {
        const router = Router();
        //router.use('/api/empleado',empleadoRouter)
        router.use("/api/juego", juegoRouter);
        return router;
    }
}
//# sourceMappingURL=routes.js.map