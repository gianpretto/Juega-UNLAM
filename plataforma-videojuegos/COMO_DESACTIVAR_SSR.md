# Cómo Desactivar SSR en Angular

## ¿Por qué desactivar SSR?

- **No necesitas SEO** (tu app es privada/interna)
- **No necesitas performance inicial** (usuarios toleran carga)
- **Quieres simplicidad** (menos archivos, menos complejidad)
- **Solo usas APIs del navegador** (localStorage, window, document)

---

## Opción 1: Desactivar SSR (mantener estructura)

### Paso 1: Modificar `angular.json`

Busca la sección `"build"` → `"options"` y **elimina**:

```json
"server": "src/main.server.ts",
"outputMode": "server",
"ssr": {
  "entry": "src/server.ts"
}
```

### Paso 2: Modificar `package.json`

Cambia el script `start`:

```json
"scripts": {
  "start": "ng serve",  // En lugar de ng serve --ssr
}
```

### Paso 3: Eliminar archivos SSR (opcional)

```bash
rm src/main.server.ts
rm src/server.ts
rm src/app/app.config.server.ts
rm src/app/app.routes.server.ts
```

### Paso 4: Limpiar `app.config.ts`

Elimina cualquier referencia a:
```typescript
provideClientHydration()  // Esta línea
```

---

## Opción 2: Mantener SSR (recomendado)

### Ventajas de mantenerlo:

1. ✅ **SEO mejorado** - Google indexa tu contenido más rápido
2. ✅ **Primera carga más rápida** - El HTML viene renderizado del servidor
3. ✅ **Meta tags dinámicos** - Para compartir en redes sociales
4. ✅ **Mejor experiencia mobile** - Menos procesamiento en el cliente

### ¿Qué hacer?

**Nada especial, solo usa `isPlatformBrowser` cuando accedas a APIs del navegador:**

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MiServicio {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  guardarDatos() {
    if (this.isBrowser) {
      localStorage.setItem('key', 'value');
    }
  }
}
```

---

## ¿Cómo saber si SSR está activo?

### Método 1: Ver el HTML inicial

1. Abre tu app en `http://localhost:4200`
2. Click derecho → **Ver código fuente** (Ctrl+U)
3. Si ves el HTML completo de tu app → **SSR activo** ✅
4. Si solo ves `<app-root></app-root>` vacío → **SPA pura** ❌

### Método 2: Verificar Network

1. Abre DevTools → Network
2. Recarga la página
3. Click en el primer request (el documento HTML)
4. Si el **Response** tiene tu HTML completo → **SSR activo** ✅

---

## Recomendación Final

**⚠️ NO desactives SSR a menos que tengas una razón específica.**

Angular lo incluye por defecto porque es mejor para:
- Performance
- SEO
- Experiencia de usuario
- Compatibilidad futura

Solo necesitas aprender a usar `isPlatformBrowser` para casos especiales.
