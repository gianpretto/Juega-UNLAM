import type { JuegoRepository } from "../repository/juego.repository.js";
export declare class JuegoService {
    private juegoRepository;
    constructor(juegoRepository: JuegoRepository);
    obtenerJuegos: () => Promise<{
        id: number;
        nombre: string;
        precio: number;
        descripcion: string;
        generoId: number;
        desarrolladorId: number;
    }[]>;
    obtenerJuegoPorId: (id: number) => Promise<{
        id: number;
        nombre: string;
        precio: number;
        descripcion: string;
        generoId: number;
        desarrolladorId: number;
    } | null>;
}
//# sourceMappingURL=juego.service.d.ts.map