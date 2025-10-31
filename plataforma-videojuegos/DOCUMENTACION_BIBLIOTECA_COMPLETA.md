# 📚 Documentación Completa: Módulo de Biblioteca Personal

## 📋 Índice
1. [Visión General de la Arquitectura](#visión-general)
2. [Servicios (Services)](#servicios)
3. [Componentes (Components)](#componentes)
4. [Flujo de Datos](#flujo-de-datos)
5. [Patrones y Buenas Prácticas](#patrones)
6. [Conceptos de Angular Aplicados](#conceptos-angular)

---

## 1. Visión General de la Arquitectura {#visión-general}

### Estructura del Módulo
```
src/app/
├── core/services/
│   ├── biblioteca.service.ts       → Lógica de negocio de la biblioteca
│   └── usuario-juego.service.ts    → Comunicación HTTP con backend
└── modules/biblioteca/
    ├── pages/
    │   ├── mi-biblioteca/           → Página principal (Smart Component)
    │   └── catalogo-juegos/         → Catálogo de todos los juegos
    ├── components/
    │   ├── game-card/               → Tarjeta de juego (Presentational)
    │   ├── game-grid/               → Grid de juegos (Presentational)
    │   ├── game-search/             → Barra de búsqueda (Presentational)
    │   └── game-filters/            → Filtros (Presentational)
    └── interfaces/
        ├── juego.interface.ts       → Tipo del juego
        └── game-filter.interface.ts → Tipo de filtros
```

### Arquitectura de Capas

```
┌─────────────────────────────────────────┐
│          CAPA DE PRESENTACIÓN           │
│   (Components - UI y Templates)         │
│  - mi-biblioteca.component              │
│  - game-card.component                  │
│  - game-grid.component                  │
└──────────────┬──────────────────────────┘
               │ @Input/@Output
               │ EventEmitters
┌──────────────▼──────────────────────────┐
│     CAPA DE LÓGICA DE NEGOCIO           │
│          (Services)                     │
│  - biblioteca.service.ts                │
│  - usuario-juego.service.ts             │
└──────────────┬──────────────────────────┘
               │ HttpClient
               │ Observables (RxJS)
┌──────────────▼──────────────────────────┐
│          BACKEND API REST               │
│   GET /usuario-juego/usuario/:id        │
│   POST /usuario-juego                   │
│   DELETE /usuario-juego                 │
└─────────────────────────────────────────┘
```

---

## 2. Servicios (Services) {#servicios}

### 2.1 usuario-juego.service.ts

**Responsabilidad:** Comunicación HTTP directa con el backend (capa de acceso a datos)

#### Conceptos de Angular Aplicados:

##### ✅ Injectable con providedIn: 'root'
```typescript
@Injectable({ providedIn: 'root' })
export class UsuarioJuegoService {
  // ...
}
```
**¿Por qué?**
- `@Injectable`: Marca la clase como inyectable en el sistema de DI (Dependency Injection)
- `providedIn: 'root'`: Crea una **instancia única (singleton)** en toda la aplicación
- **Ventaja**: No necesitas agregarlo en `providers` de módulos, Angular lo gestiona automáticamente

##### ✅ HttpClient para comunicación HTTP
```typescript
constructor(private http: HttpClient) {}
```
**¿Por qué HttpClient?**
- Devuelve **Observables** (programación reactiva con RxJS)
- Maneja automáticamente la serialización/deserialización JSON
- Integrado con interceptores de Angular (auth, errores, etc.)
- Type-safe: tipado fuerte con TypeScript

##### ✅ Tipado Fuerte con Interfaces
```typescript
interface AgregarUsuarioJuegoPayload {
  usuarioId: number;
  juegoId: number;
  detalle?: string;
}

agregarJuegoAUsuario(payload: AgregarUsuarioJuegoPayload): Observable<UsuarioJuego> {
  return this.http.post<UsuarioJuego>(this.base, payload);
}
```
**¿Por qué?**
- **Type Safety**: El compilador detecta errores en tiempo de desarrollo
- **IntelliSense**: Autocompletado en el IDE
- **Documentación implícita**: El tipo documenta la estructura esperada
- **Refactoring seguro**: Cambios en la interfaz se propagan automáticamente

##### ✅ Observables en lugar de Promises
```typescript
obtenerJuegosDeUsuario(usuarioId: number): Observable<UsuarioJuego[]> {
  return this.http.get<UsuarioJuego[]>(`${this.base}/usuario/${usuarioId}`);
}
```
**¿Por qué Observables?**
- **Cancelables**: Puedes cancelar una petición HTTP con `unsubscribe()`
- **Operadores RxJS**: `map`, `filter`, `catchError`, `switchMap`, etc.
- **Lazy**: No ejecutan hasta que alguien se suscribe
- **Múltiples valores**: Pueden emitir múltiples valores en el tiempo
- **Composición**: Puedes combinar múltiples observables

**Ejemplo de uso:**
```typescript
this.usuarioJuegoService.obtenerJuegosDeUsuario(1).subscribe({
  next: (data) => console.log('Éxito:', data),
  error: (error) => console.error('Error:', error),
  complete: () => console.log('Completado')
});
```

---

### 2.2 biblioteca.service.ts

**Responsabilidad:** Lógica de negocio y orquestación de datos

#### Conceptos de Angular Aplicados:

##### ✅ Inject Function (Angular Moderno)
```typescript
export class BibliotecaService {
  private readonly http = inject(HttpClient);
  private readonly usuarioJuegoService = inject(UsuarioJuegoService);
  private readonly platformId = inject(PLATFORM_ID);
}
```
**¿Por qué `inject()` en lugar de constructor?**
- **Sintaxis moderna** de Angular 14+
- **Más conciso**: No necesitas declarar en el constructor
- **Composición funcional**: Puedes usar inject() en funciones regulares
- **Tree-shakeable**: Mejor optimización del bundle

**Comparación:**
```typescript
// ❌ Estilo antiguo
constructor(
  private http: HttpClient,
  private usuarioJuegoService: UsuarioJuegoService
) {}

// ✅ Estilo moderno
private readonly http = inject(HttpClient);
private readonly usuarioJuegoService = inject(UsuarioJuegoService);
```

##### ✅ PLATFORM_ID y isPlatformBrowser (SSR Compatible)
```typescript
private readonly platformId = inject(PLATFORM_ID);
private readonly isBrowser = isPlatformBrowser(this.platformId);

obtenerFavoritos(): Observable<number[]> {
  if (!this.isBrowser) {
    return of([]); // En SSR, retorna vacío
  }
  // En browser, usa localStorage
  const stored = localStorage.getItem('biblioteca_favoritos');
  // ...
}
```
**¿Por qué esto es crítico?**
- **Server-Side Rendering (SSR)**: Angular puede renderizarse en el servidor
- **localStorage solo existe en el browser**: No está disponible en Node.js
- **Sin esta verificación**: La app crashea en SSR con "localStorage is not defined"
- **Universal Apps**: Tu app funciona tanto en servidor como cliente

**Flujo SSR:**
```
1. Usuario solicita: http://localhost:4200/mi-biblioteca
2. Servidor Angular ejecuta el código
3. isBrowser = false → retorna of([])
4. HTML pre-renderizado se envía al browser
5. Browser hidrata la app
6. isBrowser = true → usa localStorage
```

##### ✅ Operadores RxJS
```typescript
obtenerJuegos(): Observable<Juego[]> {
  return this.usuarioJuegoService.obtenerJuegosDeUsuario(this.usuarioId).pipe(
    map((usuarioJuegos: UsuarioJuego[]) => {
      return usuarioJuegos
        .map(uj => uj.juego)
        .filter((juego): juego is Juego => juego !== undefined);
    }),
    catchError(this.handleError)
  );
}
```

**Operadores usados:**

1. **`pipe()`**: Encadena operadores
   ```typescript
   observable.pipe(
     operador1(),
     operador2(),
     operador3()
   )
   ```

2. **`map()`**: Transforma los datos
   ```typescript
   // Entrada: UsuarioJuego[]
   // Salida: Juego[]
   map((usuarioJuegos) => usuarioJuegos.map(uj => uj.juego))
   ```

3. **`catchError()`**: Maneja errores
   ```typescript
   catchError((error) => {
     console.error(error);
     return throwError(() => new Error('Error procesado'));
   })
   ```

4. **`of()`**: Crea un observable que emite un valor y completa
   ```typescript
   of([1, 2, 3]) // Observable que emite [1,2,3] inmediatamente
   ```

##### ✅ Manejo de Errores Centralizado
```typescript
private handleError(error: any): Observable<never> {
  console.error('Error en BibliotecaService:', error);
  return throwError(() => new Error('Error al procesar la solicitud.'));
}
```
**¿Por qué centralizar errores?**
- **DRY (Don't Repeat Yourself)**: Una sola función para todos los errores
- **Consistencia**: Mismo formato de error en toda la app
- **Logging**: Punto único para enviar logs a servicios externos
- **User-friendly**: Mensajes de error traducibles y comprensibles

##### ✅ Type Predicates en filter()
```typescript
.filter((juego): juego is Juego => juego !== undefined)
```
**¿Qué hace esto?**
- **Type Guard**: Le dice a TypeScript que después del filter, el tipo es definitivamente `Juego`
- **Sin esto**: TypeScript piensa que puede ser `Juego | undefined`
- **Resultado**: Evita errores de "Object is possibly 'undefined'"

**Comparación:**
```typescript
// ❌ Sin type predicate
.filter(juego => juego !== undefined)
// Tipo resultante: (Juego | undefined)[]

// ✅ Con type predicate
.filter((juego): juego is Juego => juego !== undefined)
// Tipo resultante: Juego[]
```

---

## 3. Componentes (Components) {#componentes}

### 3.1 Patrón Smart/Dumb Components

#### Smart Component (Container): mi-biblioteca.component.ts

**Características:**
- ✅ Inyecta servicios
- ✅ Gestiona estado
- ✅ Maneja lógica de negocio
- ✅ Coordina componentes hijos
- ❌ No tiene estilos complejos
- ❌ No se reutiliza

```typescript
@Component({
  selector: 'app-mi-biblioteca',
  standalone: true,
  imports: [
    CommonModule,
    GameSearchComponent,  // Componentes presentacionales
    GameFiltersComponent,
    GameGridComponent
  ],
  templateUrl: './mi-biblioteca.html',
  styleUrls: ['./mi-biblioteca.css']
})
export class MiBibliotecaComponent implements OnInit {
  // Estado
  juegos: Juego[] = [];
  filteredJuegos: Juego[] = [];
  loading: boolean = true;
  
  // Servicios
  private bibliotecaService = inject(BibliotecaService);
  
  ngOnInit(): void {
    this.cargarBiblioteca();
  }
  
  cargarBiblioteca(): void {
    this.bibliotecaService.obtenerJuegos().subscribe({
      next: (data) => {
        this.juegos = data;
        this.filteredJuegos = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar biblioteca';
        this.loading = false;
      }
    });
  }
  
  // Maneja eventos de componentes hijos
  handleSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }
}
```

#### Dumb Component (Presentational): game-card.component.ts

**Características:**
- ✅ Solo recibe datos via @Input
- ✅ Solo emite eventos via @Output
- ✅ Altamente reutilizable
- ✅ Fácil de testear
- ❌ NO inyecta servicios
- ❌ NO gestiona estado global

```typescript
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  // Entradas de datos
  @Input() juego!: Juego;
  @Input() isInBiblio: boolean = false;
  @Input() isFavorite: boolean = false;
  
  // Salidas de eventos
  @Output() onClick = new EventEmitter<void>();
  @Output() onAddToBiblio = new EventEmitter<void>();
  @Output() onToggleFavorite = new EventEmitter<void>();
  
  // Solo métodos de presentación
  getGameImage(): string {
    return this.juego.mainImagen?.url || this.placeholderImage;
  }
  
  handleCardClick(event: Event): void {
    this.onClick.emit(); // Delega al padre
  }
}
```

**¿Por qué este patrón?**

| Aspecto | Smart Component | Dumb Component |
|---------|----------------|----------------|
| **Responsabilidad** | Lógica y estado | Presentación |
| **Reusabilidad** | Baja (específico) | Alta (genérico) |
| **Testing** | Complejo (mocks) | Simple (inputs) |
| **Servicios** | Sí inyecta | No inyecta |
| **Estado** | Gestiona estado | Stateless |
| **Ejemplo** | MiBibliotecaComponent | GameCardComponent |

---

### 3.2 Conceptos de Angular en Componentes

##### ✅ Standalone Components (Angular 14+)
```typescript
@Component({
  selector: 'app-mi-biblioteca',
  standalone: true,  // ⭐ No necesita NgModule
  imports: [
    CommonModule,
    GameSearchComponent
  ]
})
```
**¿Por qué standalone?**
- **No necesitas NgModules**: Más simple
- **Tree-shaking mejorado**: Bundle más pequeño
- **Lazy loading simplificado**: Cargas solo lo que necesitas
- **Composición directa**: Importas exactamente lo que usas

**Comparación:**
```typescript
// ❌ Antiguo (con NgModule)
@NgModule({
  declarations: [MiBibliotecaComponent, GameCardComponent],
  imports: [CommonModule, ButtonModule],
  exports: [MiBibliotecaComponent]
})
export class BibliotecaModule {}

// ✅ Moderno (standalone)
@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule, GameCardComponent]
})
export class MiBibliotecaComponent {}
```

##### ✅ @Input() y @Output()
```typescript
export class GameCardComponent {
  @Input() juego!: Juego;              // Entrada del padre
  @Output() onClick = new EventEmitter<void>();  // Evento al padre
}
```

**Comunicación Padre → Hijo (@Input):**
```html
<!-- mi-biblioteca.html -->
<app-game-card [juego]="juegoSeleccionado"></app-game-card>
```

**Comunicación Hijo → Padre (@Output):**
```html
<!-- game-card.html -->
<div (click)="onClick.emit()">...</div>

<!-- mi-biblioteca.html -->
<app-game-card (onClick)="handleGameClick($event)"></app-game-card>
```

##### ✅ Lifecycle Hooks
```typescript
export class MiBibliotecaComponent implements OnInit {
  ngOnInit(): void {
    // Se ejecuta UNA VEZ después de crear el componente
    this.cargarBiblioteca();
    this.cargarFavoritos();
  }
}
```

**Hooks principales:**
- `ngOnInit()`: Inicialización (llamadas HTTP, setup)
- `ngOnChanges()`: Cuando cambia un @Input
- `ngOnDestroy()`: Limpieza (unsubscribe, timers)
- `ngAfterViewInit()`: Después de renderizar la vista

**¿Por qué OnInit y no constructor?**
```typescript
// ❌ MAL - HTTP en constructor
constructor() {
  this.http.get('/api/data').subscribe(...); // Demasiado temprano
}

// ✅ BIEN - HTTP en ngOnInit
ngOnInit() {
  this.http.get('/api/data').subscribe(...); // Momento correcto
}
```

##### ✅ Property Binding y Event Binding
```html
<!-- Property Binding [propiedad]="valor" -->
<app-game-card 
  [juego]="juego"           <!-- Pasa dato -->
  [isInBiblio]="true"       <!-- Pasa booleano -->
  [placeholderImage]="url"  <!-- Pasa string -->
></app-game-card>

<!-- Event Binding (evento)="handler($event)" -->
<app-game-card 
  (onClick)="verDetalle()"
  (onAddToBiblio)="agregar($event)"
  (onToggleFavorite)="toggleFav($event)"
></app-game-card>

<!-- Two-way Binding [(ngModel)]="variable" -->
<input [(ngModel)]="searchTerm">
```

##### ✅ Structural Directives
```html
<!-- *ngIf - Condicional -->
<div *ngIf="loading">Cargando...</div>
<div *ngIf="!loading && juegos.length > 0">Contenido</div>
<div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>

<!-- *ngFor - Loop -->
<app-game-card 
  *ngFor="let juego of filteredJuegos; trackBy: trackByJuegoId"
  [juego]="juego"
></app-game-card>

<!-- @for - Loop moderno (Angular 17+) -->
@for (juego of filteredJuegos; track juego.id) {
  <app-game-card [juego]="juego"></app-game-card>
}

<!-- @if - Condicional moderno -->
@if (loading) {
  <div>Cargando...</div>
} @else if (errorMessage) {
  <div>Error: {{ errorMessage }}</div>
} @else {
  <div>Contenido</div>
}
```

**¿Por qué trackBy?**
```typescript
trackByJuegoId(index: number, juego: Juego): number {
  return juego.id;  // Angular sabe qué items cambiaron
}
```
**Sin trackBy**: Angular re-renderiza TODA la lista cuando cambia algo
**Con trackBy**: Angular solo re-renderiza los items que cambiaron
**Resultado**: Mejor performance

---

## 4. Flujo de Datos Completo {#flujo-de-datos}

### Caso de Uso: Usuario abre Mi Biblioteca

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ROUTING                                                  │
│    Usuario navega a /mi-biblioteca                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. COMPONENTE SE CREA                                       │
│    MiBibliotecaComponent - constructor()                    │
│    - Inyecta BibliotecaService                             │
│    - Inicializa propiedades                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. LIFECYCLE - ngOnInit()                                   │
│    this.cargarBiblioteca()                                  │
│    this.cargarFavoritos()                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. SERVICIO - bibliotecaService.obtenerJuegos()            │
│    ├─ Obtiene usuarioId (actualmente hardcodeado a 1)      │
│    └─ Llama a usuarioJuegoService                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. HTTP - usuarioJuegoService.obtenerJuegosDeUsuario(1)   │
│    GET http://localhost:3000/usuario-juego/usuario/1       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. BACKEND - Prisma Query                                  │
│    prisma.Usuario_Juego.findMany({                         │
│      where: { usuarioId: 1 },                             │
│      include: {                                            │
│        juego: {                                            │
│          include: {                                        │
│            desarrollador: true,                            │
│            imagenes: true,                                 │
│            mainImagen: true,                               │
│            juego_generos: { include: { genero: true } },  │
│            plataformas: { include: { plataforma: true } }  │
│          }                                                 │
│        }                                                   │
│      }                                                     │
│    })                                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. RESPONSE - JSON con datos completos                     │
│    [                                                        │
│      {                                                      │
│        id: 1,                                              │
│        juego: {                                            │
│          id: 1,                                            │
│          nombre: "The Witcher 3",                          │
│          desarrollador: { nombre: "CD Projekt Red" },      │
│          imagenes: [...],                                  │
│          mainImagen: { url: "https://..." }                │
│        }                                                   │
│      }                                                     │
│    ]                                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. TRANSFORMACIÓN - map() en bibliotecaService             │
│    Extrae solo los juegos: usuarioJuegos.map(uj => uj.juego)│
│    Filtra undefined: filter((j): j is Juego => j !== undefined)│
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 9. SUBSCRIBE - Componente recibe datos                     │
│    next: (data) => {                                       │
│      this.juegos = data                                    │
│      this.filteredJuegos = data                            │
│      this.loading = false                                  │
│      this.extractFilterOptions()                           │
│    }                                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 10. CHANGE DETECTION - Angular detecta cambios             │
│     - juegos cambió de [] a [juego1, juego2, ...]         │
│     - loading cambió de true a false                       │
│     - Angular re-renderiza el template                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 11. RENDER - Template se actualiza                         │
│     <app-game-grid [juegos]="filteredJuegos">              │
│       <app-game-card *ngFor="let juego of juegos"          │
│                      [juego]="juego">                       │
│       </app-game-card>                                     │
│     </app-game-grid>                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 12. UI VISIBLE - Usuario ve su biblioteca                  │
│     - 4 tarjetas de juegos                                 │
│     - Imágenes reales                                      │
│     - Nombres de desarrolladores                           │
│     - Géneros y plataformas                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Patrones y Buenas Prácticas Aplicadas {#patrones}

### 5.1 Separación de Responsabilidades (SoC)

```
UsuarioJuegoService    → HTTP y comunicación con API
        ↓
BibliotecaService      → Lógica de negocio y transformaciones
        ↓
MiBibliotecaComponent  → Coordinación y estado
        ↓
GameCardComponent      → Presentación y UI
```

**Ventajas:**
- ✅ **Testeable**: Cada capa se prueba independientemente
- ✅ **Mantenible**: Cambios en una capa no afectan otras
- ✅ **Escalable**: Puedes agregar capas sin romper el código
- ✅ **Reutilizable**: Los servicios se usan en múltiples componentes

### 5.2 Dependency Injection (DI)

```typescript
// El componente NO crea el servicio, Angular lo inyecta
export class MiBibliotecaComponent {
  private bibliotecaService = inject(BibliotecaService);
  
  // Angular automáticamente:
  // 1. Crea una instancia de BibliotecaService (si no existe)
  // 2. Inyecta HttpClient en BibliotecaService
  // 3. Inyecta UsuarioJuegoService en BibliotecaService
  // 4. Provee la instancia al componente
}
```

**Ventajas:**
- ✅ **Loose Coupling**: Componente no depende de implementación concreta
- ✅ **Testing**: Puedes inyectar mocks en tests
- ✅ **Singleton**: Una instancia compartida en toda la app
- ✅ **Lazy Loading**: Servicios se crean solo cuando se necesitan

### 5.3 Reactive Programming (RxJS)

```typescript
// Composición de operadores
this.usuarioJuegoService.obtenerJuegosDeUsuario(this.usuarioId)
  .pipe(
    map(usuarios => usuarios.map(u => u.juego)),      // Transforma
    filter(juegos => juegos.length > 0),              // Filtra
    catchError(error => of([])),                      // Maneja errores
    tap(juegos => console.log('Juegos:', juegos))     // Side effect
  )
  .subscribe(juegos => this.juegos = juegos);
```

**Operadores clave:**
- **`map`**: Transforma cada valor
- **`filter`**: Filtra valores
- **`catchError`**: Maneja errores sin romper el stream
- **`tap`**: Side effects (logs, analytics)
- **`switchMap`**: Cancela request anterior (útil en búsquedas)
- **`debounceTime`**: Espera antes de emitir (útil en inputs)

### 5.4 Unsubscribe Pattern

**❌ Problema: Memory Leaks**
```typescript
ngOnInit() {
  // ❌ Se suscribe pero nunca se desuscribe
  this.bibliotecaService.obtenerJuegos().subscribe(data => {
    this.juegos = data;
  });
}
// Cuando el componente se destruye, la suscripción sigue viva
```

**✅ Solución 1: Guardar y limpiar**
```typescript
private subscription: Subscription;

ngOnInit() {
  this.subscription = this.bibliotecaService.obtenerJuegos()
    .subscribe(data => this.juegos = data);
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

**✅ Solución 2: takeUntil() + Subject**
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.bibliotecaService.obtenerJuegos()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.juegos = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

**✅ Solución 3: Async Pipe (Recomendado)**
```typescript
// Component
juegos$ = this.bibliotecaService.obtenerJuegos();

// Template
<app-game-card *ngFor="let juego of juegos$ | async" [juego]="juego">
```
Angular automáticamente se suscribe y desuscribe.

---

## 6. Conceptos Clave de Angular {#conceptos-angular}

### 6.1 Change Detection

Angular detecta cambios y actualiza la vista:

```typescript
// Cuando esto cambia...
this.juegos = data;
this.loading = false;

// Angular automáticamente actualiza el template
<div *ngIf="loading">Cargando...</div>
<app-game-card *ngFor="let juego of juegos">
```

**Estrategias:**
- **Default**: Verifica todo el árbol de componentes
- **OnPush**: Solo verifica cuando cambian @Input o eventos

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // Optimización
})
```

### 6.2 Zone.js

Angular usa Zone.js para detectar cambios automáticamente:

```typescript
// Angular detecta automáticamente estos eventos:
- HTTP requests
- setTimeout/setInterval
- Event listeners (click, input, etc.)
- Promises

// Y ejecuta change detection después de cada uno
```

### 6.3 Interpolation y Binding

```html
<!-- Interpolation {{ }} -->
<h1>{{ juego.nombre }}</h1>
<p>Precio: {{ juego.precio | currency }}</p>

<!-- Property Binding [] -->
<img [src]="juego.mainImagen?.url" [alt]="juego.nombre">
<button [disabled]="loading">Cargar</button>

<!-- Event Binding () -->
<button (click)="agregar()">Agregar</button>
<input (input)="buscar($event)">

<!-- Two-way Binding [()] -->
<input [(ngModel)]="searchTerm">
```

### 6.4 Pipes

Transforman datos en el template:

```html
<!-- Pipes built-in -->
{{ juego.precio | currency:'USD':'symbol':'1.2-2' }}
{{ juego.fecha | date:'dd/MM/yyyy' }}
{{ juego.nombre | uppercase }}
{{ juego.descripcion | slice:0:100 }}

<!-- Pipe personalizado -->
{{ juego.generos | joinNames }}
```

```typescript
// Custom Pipe
@Pipe({ name: 'joinNames' })
export class JoinNamesPipe implements PipeTransform {
  transform(items: any[]): string {
    return items?.map(i => i.nombre).join(', ') || '';
  }
}
```

---

## 7. Diagrama de Secuencia Completo

```
Usuario          Router          MiBiblioteca     BibliotecaService    UsuarioJuegoService    Backend
  |                |                    |                   |                    |              |
  |--navega a----->|                    |                   |                    |              |
  |  /biblioteca   |                    |                   |                    |              |
  |                |---crea------------>|                   |                    |              |
  |                |   componente       |                   |                    |              |
  |                |                    |---ngOnInit()----->|                    |              |
  |                |                    |                   |---obtenerJuegos()-->|              |
  |                |                    |                   |                    |--GET /usuario-juego/usuario/1-->|
  |                |                    |                   |                    |              |--Prisma query-->|
  |                |                    |                   |                    |<--JSON-------|              |
  |                |                    |                   |<--Observable-------|              |
  |                |                    |<--subscribe--------|                    |              |
  |                |                    |                   |                    |              |
  |                |                    |--actualiza state->|                    |              |
  |                |                    |  juegos = data    |                    |              |
  |                |<--render-----------|                   |                    |              |
  |<--muestra UI---|                    |                   |                    |              |
  |   biblioteca   |                    |                   |                    |              |
```

---

## 8. Resumen de Tecnologías y Conceptos

### Tecnologías Usadas:
- ✅ **Angular 17+**: Framework frontend
- ✅ **TypeScript**: Lenguaje con tipado fuerte
- ✅ **RxJS**: Programación reactiva
- ✅ **PrimeNG**: Librería de componentes UI
- ✅ **HttpClient**: Cliente HTTP de Angular
- ✅ **Standalone Components**: Arquitectura moderna sin NgModules

### Conceptos de Angular:
1. **Dependency Injection**: Inyección automática de servicios
2. **Observables**: Streams de datos asíncronos
3. **Lifecycle Hooks**: ngOnInit, ngOnDestroy, etc.
4. **Data Binding**: Property, Event, Two-way binding
5. **Structural Directives**: *ngIf, *ngFor, @if, @for
6. **Change Detection**: Actualización automática de la vista
7. **Smart/Dumb Components**: Separación de responsabilidades
8. **Services**: Lógica de negocio reutilizable
9. **Routing**: Navegación entre páginas
10. **SSR Compatibility**: Renderizado en servidor

### Patrones Aplicados:
1. **Separation of Concerns**: Servicios vs Componentes
2. **Single Responsibility**: Cada clase tiene una función
3. **Dependency Injection**: Loose coupling
4. **Observer Pattern**: Observables y suscripciones
5. **Facade Pattern**: BibliotecaService oculta complejidad
6. **Repository Pattern**: UsuarioJuegoService abstrae HTTP
7. **Presentational/Container**: Smart/Dumb components

---

## 9. Preguntas Frecuentes para tu Presentación

### ¿Por qué usamos servicios en lugar de poner la lógica en componentes?
**R:** Separación de responsabilidades. Los componentes se encargan de la UI, los servicios de la lógica de negocio. Esto hace el código más testeable, reutilizable y mantenible.

### ¿Qué son los Observables y por qué no usamos Promises?
**R:** Los Observables son streams de datos que pueden emitir múltiples valores en el tiempo, son cancelables, y permiten composición con operadores RxJS. Las Promises solo emiten un valor y no son cancelables.

### ¿Qué es Dependency Injection y cuál es su ventaja?
**R:** Es un patrón donde Angular inyecta automáticamente las dependencias (servicios) que un componente necesita. Ventajas: código desacoplado, fácil de testear con mocks, y gestión automática de instancias.

### ¿Por qué separamos Smart y Dumb Components?
**R:** Los Smart Components gestionan estado y lógica, los Dumb solo presentan datos. Esto hace que los componentes de presentación sean altamente reutilizables y fáciles de testear.

### ¿Qué es isPlatformBrowser y por qué lo necesitamos?
**R:** Verifica si el código está corriendo en el navegador o en el servidor (SSR). localStorage solo existe en el navegador, por lo que sin esta verificación la app crashearía en SSR.

### ¿Qué hace el operador pipe() en RxJS?
**R:** Permite encadenar operadores (map, filter, catchError) para transformar y manipular streams de datos de forma declarativa y funcional.

---

## 10. Conclusión

Este módulo de Biblioteca Personal implementa las mejores prácticas de Angular:

✅ **Arquitectura clara**: Servicios separados de componentes
✅ **Código reutilizable**: Componentes presentacionales genéricos
✅ **Type-safe**: TypeScript con interfaces completas
✅ **Reactivo**: RxJS y Observables
✅ **Moderno**: Standalone components, inject(), @if/@for
✅ **SSR compatible**: Funciona en servidor y cliente
✅ **Mantenible**: Cada pieza tiene una responsabilidad única
✅ **Testeable**: Servicios y componentes fáciles de probar

El flujo completo es:
```
Usuario → Router → Componente → Servicio → HTTP → Backend → Base de Datos
                      ↓
                  Template
                      ↓
                     UI
```

Cada capa tiene su responsabilidad y puede evolucionar independientemente.
