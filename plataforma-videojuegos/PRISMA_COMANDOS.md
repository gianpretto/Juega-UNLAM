# Guía de Comandos Prisma para Juega-UNLAM

## 📦 Instalación de Prisma

```bash
# Instalar Prisma CLI como dependencia de desarrollo
npm install -D prisma

# Instalar Prisma Client para usar en tu código
npm install @prisma/client
```

## 🚀 Comandos básicos

### 1. Inicializar Prisma (ya hecho)
```bash
npx prisma init
```

### 2. Generar las tablas en la base de datos
```bash
# Crea las tablas según el schema.prisma
npx prisma migrate dev --name init

# Para producción
npx prisma migrate deploy
```

### 3. Generar el cliente de Prisma
```bash
# Genera el código TypeScript para usar en tu API
npx prisma generate
```

### 4. Abrir Prisma Studio (GUI para ver/editar datos)
```bash
npx prisma studio
```

### 5. Resetear la base de datos (⚠️ Elimina todos los datos)
```bash
npx prisma migrate reset
```

### 6. Ver el estado de las migraciones
```bash
npx prisma migrate status
```

## 📝 Flujo de trabajo típico

1. **Configurar .env**
   ```bash
   cp prisma/.env.example .env
   # Editar .env con tus credenciales
   ```

2. **Crear/modificar schema.prisma**
   - Ya está creado con tus modelos

3. **Generar migración**
   ```bash
   npx prisma migrate dev --name nombre_descriptivo
   ```

4. **Generar cliente**
   ```bash
   npx prisma generate
   ```

5. **Usar en tu código Node.js**
   ```typescript
   import { PrismaClient } from '@prisma/client'
   const prisma = new PrismaClient()

   // Ejemplo: Obtener todos los juegos con sus desarrolladores
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
   })
   ```

## 🔥 Ejemplos de queries comunes

### Crear un juego
```typescript
const nuevoJuego = await prisma.juego.create({
  data: {
    nombre: "The Last of Us",
    precio: 59.99,
    descripcion: "Juego de aventura post-apocalíptico",
    codigoGen: 1001,
    fkIdDesa: 1, // ID del desarrollador
    generos: {
      create: [
        { nombre: "Acción", descripcion: "Juegos de acción" }
      ]
    },
    imagenes: {
      create: [
        { url: "https://ejemplo.com/imagen1.jpg" }
      ]
    }
  }
})
```

### Obtener juegos con relaciones
```typescript
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
})
```

### Buscar juego por ID
```typescript
const juego = await prisma.juego.findUnique({
  where: { id: 1 },
  include: {
    desarrollador: true,
    generos: true
  }
})
```

### Actualizar un juego
```typescript
const juegoActualizado = await prisma.juego.update({
  where: { id: 1 },
  data: {
    precio: 49.99
  }
})
```

### Eliminar un juego
```typescript
const juegoEliminado = await prisma.juego.delete({
  where: { id: 1 }
})
```

## 🎯 Relaciones importantes del schema

- **Juego → Desarrollador**: Muchos a Uno (un juego tiene un desarrollador)
- **Juego → Genero**: Uno a Muchos (un juego puede tener varios géneros)
- **Juego → Imagen**: Uno a Muchos (un juego puede tener varias imágenes)
- **Juego ↔ Plataforma**: Muchos a Muchos (a través de JuegoPlataforma)

## 🛠️ Troubleshooting

### Error: "Environment variable not found"
```bash
# Asegúrate de tener el archivo .env en la raíz del proyecto
# con DATABASE_URL configurado
```

### Error: "Can't reach database"
```bash
# Verifica que tu base de datos esté corriendo
# MySQL: sudo service mysql start
# PostgreSQL: sudo service postgresql start
```

### Regenerar cliente después de cambios
```bash
npx prisma generate
```
