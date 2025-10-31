# 🔧 Configuración del Backend para Usuario_Juego

## Problema

El frontend no muestra:
- ❌ Imágenes de los juegos
- ❌ Nombre del desarrollador

## Causa

El endpoint `/usuario-juego/usuario/:usuarioId` debe incluir las relaciones de Prisma para que el frontend reciba todos los datos necesarios.

## ✅ Solución: Configurar el endpoint con `include`

### Código del Backend (Node.js + Prisma)

En tu archivo de rutas o controlador de `usuario-juego`, el endpoint debe verse así:

```typescript
// Ejemplo con Express + Prisma
app.get('/usuario-juego/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  
  try {
    const usuarioJuegos = await prisma.usuario_Juego.findMany({
      where: {
        usuarioId: parseInt(usuarioId)
      },
      include: {
        juego: {
          include: {
            desarrollador: true,        // ✅ Incluir desarrollador
            imagenes: true,              // ✅ Incluir imágenes
            mainImagen: true,            // ✅ Incluir imagen principal
            juego_generos: {             // ✅ Incluir géneros
              include: {
                genero: true
              }
            },
            plataformas: {               // ✅ Incluir plataformas
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
    
    res.json(usuarioJuegos);
  } catch (error) {
    console.error('Error al obtener juegos del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
});
```

## 📋 Estructura del Response Esperado

El endpoint debe retornar algo como esto:

```json
[
  {
    "id": 1,
    "detalle": "Juego de prueba admin",
    "fecha": "2025-10-01T08:00:00.000Z",
    "usuarioId": 1,
    "juegoId": 1,
    "juego": {
      "id": 1,
      "nombre": "The Witcher 3: Wild Hunt",
      "precio": 39.99,
      "descripcion": "Juego de rol de mundo abierto...",
      "desarrolladorId": 1,
      "mainImagenId": 1,
      "desarrollador": {
        "id": 1,
        "nombre": "CD Projekt Red"
      },
      "mainImagen": {
        "id": 1,
        "url": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        "alt": "The Witcher 3 portada",
        "orden": 0,
        "isMain": true
      },
      "imagenes": [
        {
          "id": 1,
          "url": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
          "alt": "The Witcher 3 portada",
          "orden": 0,
          "isMain": true
        },
        {
          "id": 2,
          "url": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_1.jpg",
          "alt": "Gameplay 1",
          "orden": 1,
          "isMain": false
        }
      ],
      "juego_generos": [
        {
          "id": 1,
          "detalle": "RPG principal",
          "genero": {
            "id": 1,
            "nombre": "RPG"
          }
        },
        {
          "id": 2,
          "detalle": "Combate de acción",
          "genero": {
            "id": 2,
            "nombre": "Acción"
          }
        }
      ],
      "plataformas": [
        {
          "id": 1,
          "plataforma": {
            "id": 1,
            "nombre": "PC"
          }
        },
        {
          "id": 2,
          "plataforma": {
            "id": 2,
            "nombre": "PlayStation 5"
          }
        }
      ]
    }
  }
]
```

## 🎯 Verificación

Para verificar que el endpoint está devolviendo los datos correctamente:

### 1. **Probar el endpoint directamente:**
```bash
curl http://localhost:3000/usuario-juego/usuario/1
```

O desde el navegador:
```
http://localhost:3000/usuario-juego/usuario/1
```

### 2. **Verificar en las DevTools del navegador:**
- Abre la pestaña **Network** en las DevTools
- Recarga la página de Mi Biblioteca
- Busca la petición a `/usuario-juego/usuario/1`
- Verifica que el response incluya `desarrollador` e `imagenes`

### 3. **Checklist de datos necesarios:**
- ✅ `juego.desarrollador.nombre` debe existir
- ✅ `juego.imagenes[]` debe tener al menos una imagen
- ✅ `juego.mainImagen` o `juego.imagenes[0]` debe tener una URL válida
- ✅ `juego.juego_generos[].genero.nombre` debe existir
- ✅ `juego.plataformas[].plataforma.nombre` debe existir

## 🔧 Alternativa: Select específico

Si quieres optimizar y traer solo los campos necesarios:

```typescript
const usuarioJuegos = await prisma.usuario_Juego.findMany({
  where: { usuarioId: parseInt(usuarioId) },
  select: {
    id: true,
    detalle: true,
    fecha: true,
    juego: {
      select: {
        id: true,
        nombre: true,
        precio: true,
        descripcion: true,
        desarrollador: {
          select: {
            nombre: true
          }
        },
        mainImagen: {
          select: {
            url: true,
            alt: true
          }
        },
        imagenes: {
          select: {
            url: true,
            alt: true,
            orden: true,
            isMain: true
          },
          orderBy: {
            orden: 'asc'
          }
        },
        juego_generos: {
          select: {
            genero: {
              select: {
                nombre: true
              }
            }
          }
        },
        plataformas: {
          select: {
            plataforma: {
              select: {
                nombre: true
              }
            }
          }
        }
      }
    }
  }
});
```

## 📝 Notas Importantes

1. **Nombres de campos:** Prisma usa los nombres definidos en el schema. Si tu schema tiene `usuario_juegos`, úsalo tal cual.

2. **Performance:** Si tienes muchos juegos, considera paginar los resultados.

3. **Caché:** Considera implementar caché en el backend para endpoints frecuentes.

4. **CORS:** Asegúrate de que tu backend tenga CORS configurado para permitir peticiones desde `http://localhost:4200`.
