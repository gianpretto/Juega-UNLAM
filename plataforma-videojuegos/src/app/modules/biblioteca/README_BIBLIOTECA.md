# 📚 Módulo Mi Biblioteca - Documentación

## Cómo funciona la biblioteca del usuario

El componente **Mi Biblioteca** obtiene los juegos del usuario actual usando el endpoint del backend:

```
GET /usuario-juego/usuario/:usuarioId
```

Este endpoint retorna todos los registros de `Usuario_Juego` para un usuario específico, incluyendo los datos completos de cada juego.

## Configuración del Usuario ID

### En Producción (con autenticación)
El ID del usuario debería venir de un servicio de autenticación. Por ahora está hardcodeado.

### Para Testing/Desarrollo

#### Opción 1: Cambiar en el servicio (recomendado)
Edita `src/app/core/services/biblioteca.service.ts`:

```typescript
@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  // Cambia este valor según el usuario que quieras consultar
  private usuarioId = 6; // Usuario 6, por ejemplo
  // ...
}
```

#### Opción 2: Cambiar programáticamente
En cualquier componente que inyecte `BibliotecaService`:

```typescript
constructor(private bibliotecaService: BibliotecaService) {
  // Cambiar a usuario 6
  this.bibliotecaService.setUsuarioId(6);
}
```

#### Opción 3: Desde la consola del navegador
Abre las DevTools y ejecuta:

```javascript
// Obtener el servicio desde Angular
ng.probe(document.querySelector('app-mi-biblioteca')).injector.get(BibliotecaService).setUsuarioId(6);
```

## Flujo de Datos

```
┌─────────────────────────┐
│  MiBibliotecaComponent  │
│   (Smart Component)     │
└───────────┬─────────────┘
            │
            │ ngOnInit()
            ▼
┌─────────────────────────┐
│   BibliotecaService     │
│  - getUsuarioId()       │
│  - obtenerJuegos()      │
└───────────┬─────────────┘
            │
            │ Delega a
            ▼
┌─────────────────────────┐
│  UsuarioJuegoService    │
│  GET /usuario-juego/    │
│      usuario/:id        │
└───────────┬─────────────┘
            │
            │ HTTP Request
            ▼
┌─────────────────────────┐
│   Backend API           │
│  Retorna Usuario_Juego[]│
│  con datos de Juego     │
└─────────────────────────┘
```

## Estructura del Response

El backend retorna un array de objetos `Usuario_Juego`:

```typescript
[
  {
    id: 1,
    detalle: "Juego comprado",
    fecha: "2025-10-28T00:00:00.000Z",
    usuarioId: 6,
    juegoId: 10,
    juego: {
      id: 10,
      nombre: "The Witcher 3",
      precio: 29.99,
      descripcion: "...",
      desarrolladorId: 1,
      desarrollador: { ... },
      imagenes: [ ... ],
      juegoGeneros: [ ... ],
      plataformas: [ ... ]
    }
  },
  // ... más juegos
]
```

El servicio extrae solo los objetos `juego` de cada relación y los retorna al componente.

## Próximas Mejoras

- [ ] Implementar servicio de autenticación real
- [ ] Obtener `usuarioId` desde JWT o sesión
- [ ] Agregar guards de ruta para proteger la biblioteca
- [ ] Implementar endpoint de favoritos en backend
- [ ] Cachear resultados con RxJS shareReplay
