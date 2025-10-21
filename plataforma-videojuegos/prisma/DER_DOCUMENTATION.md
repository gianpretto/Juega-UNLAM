# 📊 Diagrama Entidad-Relación - Juega UNLAM

## Estructura Completa de la Base de Datos

Este schema de Prisma refleja exactamente el DER proporcionado.

---

## 📋 **Tablas y Relaciones**

### **1. TIPO_USUARIO**
```typescript
- LONG ID (PK)
- STRING DESCRIPCION
```
**Relación:** 1:N con USUARIO  
**Propósito:** Define tipos de usuarios (ADMIN, CLIENTE)

---

### **2. USUARIO**
```typescript
- LONG ID (PK)
- STRING NOMBRE
- STRING PASSWORD
- STRING APELLIDO
- STRING DIRECCION
- STRING EMAIL (UNIQUE)
- FK_ID_TIPO_USUARIO (FK)
```
**Relaciones:**
- N:1 con TIPO_USUARIO (ES DE)
- 1:N con CARRITO (POSEE EN)
- 1:N con REVIEW (escribe)
- N:M con JUEGO (COMPRA) → a través de USUARIO_JUEGO

---

### **3. DESARROLLADOR**
```typescript
- LONG ID (PK)
- STRING NOMBRE
- STRING DESCRIPCION
```
**Relación:** 1:N con JUEGO (TIENE)  
**Propósito:** Estudios desarrolladores de videojuegos

---

### **4. PLATAFORMA**
```typescript
- LONG ID (PK)
- STRING NOMBRE
- STRING DESCRIPCION
```
**Relación:** N:M con JUEGO (ES JUGABLE EN) → a través de JUEGO_PLATAFORMA

---

### **5. GENERO**
```typescript
- LONG ID (PK)
- STRING NOMBRE
- STRING DESCRIPCION
```
**Relación:** N:M con JUEGO (PERTENECE A) → a través de JUEGO_GENERO

---

### **6. JUEGO** (Tabla Central)
```typescript
- LONG ID (PK)
- STRING NOMBRE
- DOUBLE PRECIO
- STRING DESCRIPCION
- LONG FK_ID_DESA (FK → DESARROLLADOR)
```
**Relaciones:**
- N:1 con DESARROLLADOR
- N:M con PLATAFORMA (JUEGO_PLATAFORMA)
- N:M con GENERO (JUEGO_GENERO)
- 1:N con IMAGEN
- 1:N con REVIEW
- N:M con CARRITO (CARRITO_JUEGO)
- N:M con USUARIO (USUARIO_JUEGO - historial de compras)

---

### **7. JUEGO_PLATAFORMA** (Tabla Intermedia)
```typescript
- LONG ID (PK)
- LONG FK_ID_JUEGO (FK)
- LONG FK_ID_PLATAFORMA (FK)
```
**Constraint:** UNIQUE(FK_ID_JUEGO, FK_ID_PLATAFORMA)  
**Propósito:** Relación N:M entre Juego y Plataforma

---

### **8. JUEGO_GENERO** (Tabla Intermedia)
```typescript
- ID DETALLE (PK)
- FK_ID_JUEGO (FK)
- FK_ID_GENERO (FK)
```
**Constraint:** UNIQUE(FK_ID_JUEGO, FK_ID_GENERO)  
**Propósito:** Relación N:M entre Juego y Género

---

### **9. IMAGEN**
```typescript
- NUMBER ID (PK)
- STRING URL
- FK_ID_JUEGOI (FK)
```
**Relación:** N:1 con JUEGO (TIENE DENTRO)  
**Propósito:** Almacenar URLs de imágenes de los juegos

---

### **10. REVIEW**
```typescript
- LONG ID (PK)
- STRING DESCRIPCION
- LONG FK_ID_USUARIO (FK)
- LONG FK_ID_JUEGO (FK)
```
**Relaciones:**
- N:1 con USUARIO
- N:1 con JUEGO

**Propósito:** Reseñas/valoraciones de usuarios sobre juegos

---

### **11. CARRITO**
```typescript
- ID DETALLE (PK)
- FK_ID_USUARIO (FK)
```
**Relaciones:**
- N:1 con USUARIO (POSEE EN)
- N:M con JUEGO (TIENE DENTRO) → a través de CARRITO_JUEGO

**Propósito:** Carrito de compras temporal

---

### **12. CARRITO_JUEGO** (Tabla Intermedia)
```typescript
- ID DETALLE (PK)
- FK_ID_CARRITO (FK)
- FK_ID_JUEGO (FK)
```
**Constraint:** UNIQUE(FK_ID_CARRITO, FK_ID_JUEGO)  
**Propósito:** Juegos dentro del carrito de compras

---

### **13. USUARIO_JUEGO** (Tabla Intermedia)
```typescript
- LONG ID (PK)
- STRING DETALLE
- DATE FECHA
- FK_ID_USUARIO (FK)
- FK_ID_JUEGOI (FK)
```
**Propósito:** Historial de compras - Juegos adquiridos por usuarios

---

## 🔗 **Resumen de Relaciones**

```
┌──────────────┐       ┌──────────┐       ┌──────────────┐
│ TIPO_USUARIO │ 1---N │ USUARIO  │ N---1 │   CARRITO    │
└──────────────┘       └────┬─────┘       └──────┬───────┘
                            │                     │
                            │ 1:N                 │ N:M
                            │                     │
                       ┌────▼─────┐          ┌───▼──────┐
                       │  REVIEW  │          │ CARRITO_ │
                       └──────────┘          │  JUEGO   │
                                             └──────────┘
                                                   │
┌──────────────┐                                   │
│ DESARROLLADOR│ 1---N                             │
└──────┬───────┘       ┌──────────┐                │
       │               │  JUEGO   │◄───────────────┘
       └──────────────►│          │
                       └──┬───┬───┘
                          │   │
              ┌───────────┘   └───────────┐
              │ N:M                    N:M │
         ┌────▼─────────┐         ┌───────▼────────┐
         │ JUEGO_GENERO │         │ JUEGO_PLATAFORMA│
         └────┬─────────┘         └───────┬────────┘
              │                           │
         ┌────▼────┐              ┌───────▼────┐
         │ GENERO  │              │ PLATAFORMA │
         └─────────┘              └────────────┘

         ┌──────────┐
         │  IMAGEN  │ N---1 JUEGO
         └──────────┘

         ┌──────────────┐
         │ USUARIO_JUEGO│ (Historial)
         │ N:M (USUARIO-JUEGO)
         └──────────────┘
```

---

## 🎯 **Características del Schema**

### ✅ **Integridad Referencial**
- Todas las FK tienen `onDelete` y `onUpdate` configurados
- Cascadas en tablas dependientes (Reviews, Imágenes, etc.)
- `NoAction` en relaciones críticas (Usuario-TipoUsuario, Juego-Desarrollador)

### ✅ **Índices para Performance**
- Índices en todas las Foreign Keys
- Formato: `idx_tabla_relacion`

### ✅ **Constraints Únicos**
- Email único en USUARIO
- Combinaciones únicas en tablas N:M para evitar duplicados

### ✅ **Nombres Exactos del DER**
- Uso de `@@map()` para mantener nombres en mayúsculas
- Nombres de columnas con prefijos del tipo (LONG, STRING, etc.)

---

## 📝 **Comandos para empezar**

```bash
# 1. Instalar dependencias
npm install -D prisma
npm install @prisma/client

# 2. Configurar .env
DATABASE_URL="mysql://user:password@localhost:3306/juega_unlam"

# 3. Crear las tablas
npx prisma migrate dev --name init_from_der

# 4. Generar cliente
npx prisma generate

# 5. Ver/editar datos
npx prisma studio
```

---

## 🔥 **Queries de Ejemplo**

### Obtener usuario con su carrito y compras
```typescript
const usuario = await prisma.usuario.findUnique({
  where: { id: 1 },
  include: {
    tipoUsuario: true,
    carritos: {
      include: {
        juegos: {
          include: {
            juego: true
          }
        }
      }
    },
    compras: {
      include: {
        juego: true
      }
    }
  }
})
```

### Obtener juego completo con todas sus relaciones
```typescript
const juego = await prisma.juego.findUnique({
  where: { id: 1 },
  include: {
    desarrollador: true,
    juegoPlataformas: {
      include: {
        plataforma: true
      }
    },
    juegoGeneros: {
      include: {
        genero: true
      }
    },
    imagenes: true,
    reviews: {
      include: {
        usuario: true
      }
    }
  }
})
```

### Agregar juego al carrito
```typescript
const carritoJuego = await prisma.carritoJuego.create({
  data: {
    fkIdCarrito: 1,
    fkIdJuego: 5
  }
})
```

### Registrar una compra
```typescript
const compra = await prisma.usuarioJuego.create({
  data: {
    fkIdUsuario: 1,
    fkIdJuego: 5,
    detalle: "Compra mediante tarjeta de crédito",
    fechaCompra: new Date()
  }
})
```

---

## ⚠️ **Notas Importantes**

1. **Nombres de columnas:** Se mantuvieron los nombres exactos del DER (LONG ID, STRING NOMBRE, etc.)
2. **Tipo DOUBLE:** Se convirtió a `Decimal` en Prisma para precisión en precios
3. **DATE FECHA:** Se mapeó a `DateTime` con `@default(now())`
4. **Tablas N:M:** Todas tienen constraints únicos para evitar duplicados
