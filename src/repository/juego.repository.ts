import { prisma } from "../prisma.js";

export class JuegoRepository{

    async obtenerJuegos(){
        return prisma.juego.findMany();
    }   

    async obtenerJuegoPorId(id:number){
        return prisma.juego.findUnique({
            where:{id}
        });
    }
    async eliminarJuego(id:number){
        return prisma.juego.delete({
            where:{id}
        });
    }
}