import { prisma } from "../prisma.js";
export class JuegoRepository {
    async obtenerJuegos() {
        return prisma.juego.findMany();
    }
    async obtenerJuegoPorId(id) {
        return prisma.juego.findUnique({
            where: { id }
        });
    }
}
//# sourceMappingURL=juego.repository.js.map