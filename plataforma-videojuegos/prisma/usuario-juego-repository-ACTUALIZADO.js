import { prisma } from "../prisma.js";

export class UsuarioJuegoRepository {
  async crearRelacion(usuarioId: number, juegoId: number) {
    return prisma.Usuario_Juego.create({ data: { usuarioId, juegoId, detalle: "" } });
  }

  async obtenerJuegosDeUsuario(usuarioId: number) {
    return prisma.Usuario_Juego.findMany({
      where: { usuarioId },
      include: { 
        juego: {
          include: {
            // ⭐ Incluir desarrollador para mostrar el nombre
            desarrollador: true,
            
            // ⭐ Incluir imágenes ordenadas por orden
            imagenes: {
              orderBy: {
                orden: 'asc'
              }
            },
            
            // ⭐ Incluir la imagen principal
            mainImagen: true,
            
            // ⭐ Incluir géneros con la relación N:N
            juego_generos: {
              include: {
                genero: true
              }
            },
            
            // ⭐ Incluir plataformas con la relación N:N
            plataformas: {
              include: {
                plataforma: true
              }
            }
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  }

  async obtenerUsuariosDeJuego(juegoId: number) {
    return prisma.Usuario_Juego.findMany({
      where: { juegoId },
      include: { usuario: true }
    });
  }

  async eliminarRelacion(usuarioId: number, juegoId: number) {
    return prisma.Usuario_Juego.deleteMany({
      where: { usuarioId, juegoId }
    });
  }
}
