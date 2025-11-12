# 🎮 Schema de Base de Datos - Juega UNLAM

Este directorio contiene el schema de Prisma convertido desde los modelos TypeScript de Angular.

## 📋 Estructura de la Base de Datos

### Tablas principales:

1. **desarrollador** - Estudios de desarrollo de videojuegos
2. **plataforma** - Plataformas de juego (PC, PlayStation, Xbox, etc.)
3. **juego** - Tabla principal de juegos
4. **genero** - Géneros de los juegos (relacionado con juego)
5. **imagen** - URLs de imágenes de los juegos
6. **juego_plataforma** - Tabla intermedia para relación N:M entre juegos y plataformas

### Relaciones:

```
Desarrollador 1 ----< N Juego
Juego 1 ----< N Genero
Juego 1 ----< N Imagen
Juego N ----< N Plataforma (a través de JuegoPlataforma)
```

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
npm install -D prisma
npm install @prisma/client
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y ajusta los valores:

```bash
cp prisma/.env.example .env
```

Edita `.env` con tus credenciales:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/juega_unlam"
```

### 3. Crear la base de datos

```bash
# Crear las tablas
npx prisma migrate dev --name init

# Generar el cliente de Prisma
npx prisma generate
```

### 4. (Opcional) Poblar con datos de ejemplo

```bash
npx prisma db seed
```

## 📊 Visualizar datos

Abre Prisma Studio para ver/editar datos con una interfaz gráfica:

```bash
npx prisma studio
```

## 🔄 Cambios posteriores al schema

Si modificas `schema.prisma`:

```bash
# 1. Crear migración
npx prisma migrate dev --name descripcion_del_cambio

# 2. Regenerar cliente
npx prisma generate
```

## 📝 Diferencias con los modelos de Angular

| Angular Model | Prisma Model | Cambios |
|--------------|--------------|---------|
| `Juego.precio: number` | `precio: Decimal` | Mejor precisión para montos |
| `Genero.fkIdJuego` | `fkIdJuego + relación` | Agregada relación explícita |
| `JuegoPlataforma` | Tabla intermedia completa | Agregados índices y constraints |
| Opcional | `@@map()` | Nombres de tablas en minúsculas |
| N/A | `onDelete: Cascade` | Eliminación en cascada configurada |

## 🎯 Mapeo de campos

### Juego
- `id` → `@id @default(autoincrement())`
- `nombre` → `VarChar(150)`
- `precio` → `Decimal(10, 2)` ✨ (Cambio de number a Decimal)
- `descripcion` → `Text`
- `fkIdDesa` → Foreign key con índice

### Genero
- Ahora tiene relación explícita con `Juego`
- `onDelete: Cascade` → Si se elimina el juego, se eliminan sus géneros

### Imagen
- Relación 1:N con Juego
- `onDelete: Cascade` → Si se elimina el juego, se eliminan sus imágenes

### JuegoPlataforma
- Constraint `@@unique` → Evita duplicados
- Doble Foreign Key con índices
- `onDelete: Cascade` en ambas relaciones

## 🔍 Queries de ejemplo

Ver archivo `ejemplo-servidor.ts` para ejemplos completos de:
- ✅ Crear juegos con relaciones
- ✅ Obtener juegos con includes
- ✅ Actualizar y eliminar
- ✅ Filtros y búsquedas

## 🛠️ Comandos útiles

```bash
# Ver estado de migraciones
npx prisma migrate status

# Resetear BD (⚠️ elimina datos)
npx prisma migrate reset

# Generar solo el cliente (sin migración)
npx prisma generate

# Formatear schema.prisma
npx prisma format

# Validar schema
npx prisma validate
```

## 📚 Recursos

- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Guía de Migraciones](https://www.prisma.io/docs/concepts/components/prisma-migrate)

## ⚠️ Notas importantes

1. **Decimal vs Number**: Cambié `precio` a `Decimal` para evitar problemas de precisión con montos.
2. **Cascadas**: Configuré `onDelete: Cascade` en Genero e Imagen para mantener integridad referencial.
3. **Índices**: Agregué índices en todas las Foreign Keys para mejorar rendimiento.
4. **Unique constraint**: En `JuegoPlataforma` para evitar duplicados.

## 🔐 Seguridad

No olvides agregar `.env` a tu `.gitignore`:

```gitignore
.env
```
