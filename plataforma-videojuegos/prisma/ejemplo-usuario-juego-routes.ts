// ============================================
// ENDPOINT PARA OBTENER JUEGOS DE UN USUARIO
// ============================================
// Este archivo muestra cómo debe ser el endpoint en tu backend Node.js

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /usuario-juego/usuario/:usuarioId
 * Obtiene todos los juegos de un usuario con sus relaciones completas
 */
router.get('/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const usuarioJuegos = await prisma.usuario_Juego.findMany({
      where: {
        usuarioId: parseInt(usuarioId)
      },
      include: {
        juego: {
          include: {
            // ⭐ CRÍTICO: Incluir desarrollador para que aparezca el nombre
            desarrollador: true,
            
            // ⭐ CRÍTICO: Incluir imágenes para mostrarlas en el frontend
            imagenes: {
              orderBy: {
                orden: 'asc'
              }
            },
            
            // ⭐ Incluir la imagen principal si existe
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
            },
            
            // Opcional: Incluir reviews si las necesitas
            // reviews: {
            //   include: {
            //     usuario: {
            //       select: {
            //         nombre: true,
            //         apellido: true
            //       }
            //     }
            //   }
            // }
          }
        }
      },
      orderBy: {
        fecha: 'desc' // Ordenar por fecha de compra, más reciente primero
      }
    });

    // Retornar los datos
    res.json(usuarioJuegos);
    
  } catch (error) {
    console.error('❌ Error al obtener juegos del usuario:', error);
    res.status(500).json({ 
      error: 'Error al obtener los juegos del usuario',
      message: error.message 
    });
  }
});

/**
 * POST /usuario-juego
 * Agregar un juego a la biblioteca de un usuario
 */
router.post('/', async (req, res) => {
  const { usuarioId, juegoId, detalle } = req.body;

  try {
    // Verificar si ya existe
    const existe = await prisma.usuario_Juego.findFirst({
      where: {
        usuarioId: parseInt(usuarioId),
        juegoId: parseInt(juegoId)
      }
    });

    if (existe) {
      return res.status(400).json({ error: 'El juego ya está en la biblioteca' });
    }

    const nuevoUsuarioJuego = await prisma.usuario_Juego.create({
      data: {
        usuarioId: parseInt(usuarioId),
        juegoId: parseInt(juegoId),
        detalle: detalle || 'Juego agregado a la biblioteca',
        fecha: new Date()
      },
      include: {
        juego: {
          include: {
            desarrollador: true,
            imagenes: true,
            mainImagen: true
          }
        }
      }
    });

    res.status(201).json(nuevoUsuarioJuego);
    
  } catch (error) {
    console.error('❌ Error al agregar juego:', error);
    res.status(500).json({ 
      error: 'Error al agregar el juego',
      message: error.message 
    });
  }
});

/**
 * DELETE /usuario-juego
 * Eliminar un juego de la biblioteca de un usuario
 */
router.delete('/', async (req, res) => {
  const { usuarioId, juegoId, id } = req.body;

  try {
    // Buscar por ID específico o por combinación usuario-juego
    const whereClause = id 
      ? { id: parseInt(id) }
      : {
          usuarioId: parseInt(usuarioId),
          juegoId: parseInt(juegoId)
        };

    await prisma.usuario_Juego.deleteMany({
      where: whereClause
    });

    res.status(204).send();
    
  } catch (error) {
    console.error('❌ Error al eliminar juego:', error);
    res.status(500).json({ 
      error: 'Error al eliminar el juego',
      message: error.message 
    });
  }
});

export default router;
