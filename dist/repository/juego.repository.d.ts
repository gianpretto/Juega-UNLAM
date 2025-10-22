export declare class JuegoRepository {
    obtenerJuegos(): Promise<{
        id: number;
        nombre: string;
        precio: number;
        descripcion: string;
        generoId: number;
        desarrolladorId: number;
    }[]>;
    obtenerJuegoPorId(id: number): Promise<{
        id: number;
        nombre: string;
        precio: number;
        descripcion: string;
        generoId: number;
        desarrolladorId: number;
    } | null>;
}
//# sourceMappingURL=juego.repository.d.ts.map