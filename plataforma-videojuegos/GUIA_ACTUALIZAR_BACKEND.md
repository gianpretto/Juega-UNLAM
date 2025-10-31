# 🚀 Guía: Actualizar Endpoint del Backend

## 📋 Resumen
Necesitas **modificar o crear** el endpoint en tu proyecto Node.js para que incluya las relaciones de Prisma.

---

## 🎯 Paso 1: Ubicar o Crear el Archivo de Rutas

Busca en tu proyecto Node.js un archivo similar a:
```
src/routes/usuario-juego.routes.ts
routes/usuario-juego.js
controllers/usuario-juego.controller.ts
```

Si no existe, créalo en la carpeta de rutas de tu proyecto.

---

## 🎯 Paso 2: Código del Endpoint

### Opción A: Si YA TIENES el endpoint, REEMPLAZA el código:

```typescript
// GET /usuario-juego/usuario/:usuarioId
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
            desarrollador: true,        // ⭐ AÑADE ESTO
            imagenes: {                 // ⭐ AÑADE ESTO
              orderBy: { orden: 'asc' }
            },
            mainImagen: true,           // ⭐ AÑADE ESTO
            juego_generos: {            // ⭐ AÑADE ESTO
              include: { genero: true }
            },
            plataformas: {              // ⭐ AÑADE ESTO
              include: { plataforma: true }
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
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});
```

### Opción B: Si NO TIENES el endpoint, crea el archivo completo:

Copia el contenido de: `prisma/ejemplo-usuario-juego-routes.ts` que acabo de crear.

---

## 🎯 Paso 3: Registrar la Ruta (si es nueva)

En tu archivo principal del servidor (ej: `index.ts`, `server.ts`, `app.ts`):

```typescript
import usuarioJuegoRoutes from './routes/usuario-juego.routes';

// Antes de app.listen(), agregar:
app.use('/usuario-juego', usuarioJuegoRoutes);
```

---

## 🎯 Paso 4: Verificar CORS

Asegúrate de que tu backend tenga CORS configurado:

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:4200',  // URL de Angular
  credentials: true
}));
```

---

## 🎯 Paso 5: Probar el Endpoint

### 1. Inicia tu servidor Node.js:
```bash
npm run dev
# o
node server.js
```

### 2. Prueba el endpoint en el navegador o Postman:
```
GET http://localhost:3000/usuario-juego/usuario/1
```

### 3. Verifica que el response incluya:
```json
[
  {
    "id": 1,
    "detalle": "Juego de prueba",
    "fecha": "2025-10-01T08:00:00.000Z",
    "usuarioId": 1,
    "juegoId": 1,
    "juego": {
      "id": 1,
      "nombre": "The Witcher 3",
      "precio": 39.99,
      "desarrollador": {           // ✅ DEBE EXISTIR
        "id": 1,
        "nombre": "CD Projekt Red"
      },
      "imagenes": [                 // ✅ DEBE EXISTIR
        {
          "id": 1,
          "url": "https://...",
          "isMain": true
        }
      ],
      "mainImagen": {               // ✅ DEBE EXISTIR
        "id": 1,
        "url": "https://..."
      },
      "juego_generos": [...],       // ✅ DEBE EXISTIR
      "plataformas": [...]          // ✅ DEBE EXISTIR
    }
  }
]
```

---

## 🎯 Paso 6: Probar en Angular

1. Asegúrate de que Angular esté apuntando al backend correcto en `environment.ts`:
   ```typescript
   export const environment = {
     apiUrl: 'http://localhost:3000/'
   };
   ```

2. Inicia Angular:
   ```bash
   ng serve
   ```

3. Navega a:
   ```
   http://localhost:4200/mi-biblioteca
   ```

4. Abre DevTools (F12) > Network y verifica la petición a `/usuario-juego/usuario/1`

---

## ❓ Troubleshooting

### ❌ Error: "Cannot find module '@prisma/client'"
```bash
npm install @prisma/client
npx prisma generate
```

### ❌ Error: "CORS blocked"
Asegúrate de que el backend tenga:
```typescript
app.use(cors({ origin: 'http://localhost:4200' }));
```

### ❌ Las imágenes no se muestran
- Verifica que el endpoint devuelva `juego.imagenes` o `juego.mainImagen`
- Verifica que las URLs de las imágenes sean accesibles
- Revisa la consola del navegador para errores 404

### ❌ "Desarrollador desconocido"
- Verifica que el endpoint devuelva `juego.desarrollador.nombre`
- Verifica en la base de datos que la tabla `Juego` tenga `desarrolladorId` válido

---

## 📝 Checklist Final

- [ ] Endpoint actualizado con `include`
- [ ] CORS configurado
- [ ] Servidor Node.js corriendo
- [ ] Angular apuntando al backend correcto
- [ ] Endpoint probado en navegador/Postman
- [ ] Response incluye desarrollador e imágenes
- [ ] Frontend muestra las imágenes correctamente
- [ ] Frontend muestra el nombre del desarrollador

---

## 🎉 ¡Listo!

Una vez completados estos pasos, deberías ver:
- ✅ Imágenes reales de los juegos
- ✅ Nombres de los desarrolladores
- ✅ Géneros correctos
- ✅ Plataformas disponibles
