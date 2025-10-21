// Ejemplo de servidor Node.js con Express y Prisma
// Este archivo muestra cómo integrar el schema de Prisma en tu backend

import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middleware para parsear JSON
app.use(express.json());

// ========================================
// RUTAS PARA JUEGOS
// ========================================

// GET /api/juegos - Obtener todos los juegos
app.get('/api/juegos', async (req, res) => {
  try {
    const juegos = await prisma.juego.findMany({
      include: {
        desarrollador: true,
        generos: true,
        imagenes: true,
        juegoPlataformas: {
          include: {
            plataforma: true
          }
        }
      }
    });

    // Transformar datos para que coincidan con el formato del frontend
    const juegosMapeados = juegos.map(juego => ({
      id: juego.id,
      nombre: juego.nombre,
      precio: juego.precio,
      descripcion: juego.descripcion,
      desarrollador: juego.desarrollador,
      generos: juego.generos,
      imagenes: juego.imagenes.map(img => img.url),
      plataformas: juego.juegoPlataformas.map(jp => jp.plataforma)
    }));

    res.json(juegosMapeados);
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});

// GET /api/juegos/:id - Obtener un juego por ID
app.get('/api/juegos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const juego = await prisma.juego.findUnique({
      where: { id: parseInt(id) },
      include: {
        desarrollador: true,
        generos: true,
        imagenes: true,
        juegoPlataformas: {
          include: {
            plataforma: true
          }
        }
      }
    });

    if (!juego) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    // Transformar datos
    const juegoMapeado = {
      id: juego.id,
      nombre: juego.nombre,
      precio: juego.precio,
      descripcion: juego.descripcion,
      desarrollador: juego.desarrollador,
      generos: juego.generos,
      imagenes: juego.imagenes.map(img => img.url),
      plataformas: juego.juegoPlataformas.map(jp => jp.plataforma)
    };

    res.json(juegoMapeado);
  } catch (error) {
    console.error('Error al obtener juego:', error);
    res.status(500).json({ error: 'Error al obtener juego' });
  }
});

// POST /api/juegos - Crear un nuevo juego
app.post('/api/juegos', async (req, res) => {
  try {
    const { nombre, precio, descripcion, fkIdDesa, generos, plataformas, imagenes } = req.body;

    const nuevoJuego = await prisma.juego.create({
      data: {
        nombre,
        precio,
        descripcion,
        codigoGen: Math.floor(Math.random() * 10000), // Generar código aleatorio
        fkIdDesa,
        generos: {
          create: generos?.map((g: any) => ({
            nombre: g.nombre,
            descripcion: g.descripcion || ''
          })) || []
        },
        imagenes: {
          create: imagenes?.map((url: string) => ({ url })) || []
        },
        juegoPlataformas: {
          create: plataformas?.map((idPlataforma: number) => ({
            fkIdPlataforma: idPlataforma
          })) || []
        }
      },
      include: {
        desarrollador: true,
        generos: true,
        imagenes: true,
        juegoPlataformas: {
          include: {
            plataforma: true
          }
        }
      }
    });

    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error('Error al crear juego:', error);
    res.status(500).json({ error: 'Error al crear juego' });
  }
});

// PUT /api/juegos/:id - Actualizar un juego
app.put('/api/juegos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;

    const juegoActualizado = await prisma.juego.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio,
        descripcion
      },
      include: {
        desarrollador: true,
        generos: true,
        imagenes: true
      }
    });

    res.json(juegoActualizado);
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    res.status(500).json({ error: 'Error al actualizar juego' });
  }
});

// DELETE /api/juegos/:id - Eliminar un juego
app.delete('/api/juegos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.juego.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    res.status(500).json({ error: 'Error al eliminar juego' });
  }
});

// ========================================
// RUTAS PARA DESARROLLADORES
// ========================================

// GET /api/desarrolladores
app.get('/api/desarrolladores', async (req, res) => {
  try {
    const desarrolladores = await prisma.desarrollador.findMany({
      include: {
        juegos: true
      }
    });
    res.json(desarrolladores);
  } catch (error) {
    console.error('Error al obtener desarrolladores:', error);
    res.status(500).json({ error: 'Error al obtener desarrolladores' });
  }
});

// POST /api/desarrolladores
app.post('/api/desarrolladores', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevoDesarrollador = await prisma.desarrollador.create({
      data: { nombre, descripcion }
    });

    res.status(201).json(nuevoDesarrollador);
  } catch (error) {
    console.error('Error al crear desarrollador:', error);
    res.status(500).json({ error: 'Error al crear desarrollador' });
  }
});

// ========================================
// RUTAS PARA PLATAFORMAS
// ========================================

// GET /api/plataformas
app.get('/api/plataformas', async (req, res) => {
  try {
    const plataformas = await prisma.plataforma.findMany();
    res.json(plataformas);
  } catch (error) {
    console.error('Error al obtener plataformas:', error);
    res.status(500).json({ error: 'Error al obtener plataformas' });
  }
});

// POST /api/plataformas
app.post('/api/plataformas', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevaPlataforma = await prisma.plataforma.create({
      data: { nombre, descripcion }
    });

    res.status(201).json(nuevaPlataforma);
  } catch (error) {
    console.error('Error al crear plataforma:', error);
    res.status(500).json({ error: 'Error al crear plataforma' });
  }
});

// ========================================
// INICIAR SERVIDOR
// ========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Prisma conectado a la base de datos`);
});

// Cerrar Prisma al detener el servidor
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
