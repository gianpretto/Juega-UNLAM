import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Juego } from "@interfaces/juego.interface";
import { BibliotecaService } from "@servicios/biblioteca.service";
import { UsuarioService } from "@servicios/usuario.service";

// Componentes hijos reutilizables
import { GameSearchComponent } from "@modules/catalogo-juegos/components/game-search/game-search.component";
import { GameGridComponent } from "@modules/catalogo-juegos/components/game-grid/game-grid.component";

/**
 * SMART COMPONENT - Mi Biblioteca Personal
 *
 * RESPONSABILIDADES:
 * - Obtener juegos guardados del servicio de biblioteca
 * - Gestionar estado (loading, error, vacío)
 * - Aplicar lógica de búsqueda
 * - Coordinar componentes hijos
 * - Gestionar favoritos y eliminación de juegos
 *
 * NO hace:
 * - Renderizar tarjetas directamente
 * - Manejar UI de búsqueda
 * - Estilos visuales complejos
 */
@Component({
  selector: 'app-mi-biblioteca',
  standalone: true,
  imports: [
    CommonModule,
    GameSearchComponent,
    GameGridComponent
  ],
  templateUrl: './mi-biblioteca.html',
  styleUrls: ['./mi-biblioteca.css']
})
export class MiBibliotecaComponent implements OnInit {

  // ========================================
  // PROPIEDADES DE ESTADO
  // ========================================

  /** ID del usuario actual obtenido de la sesión */
  currentUserId: number | null = null;

  /** Lista completa de juegos en la biblioteca */
  juegos: Juego[] = [];

  /** Lista filtrada que se muestra en el grid */
  filteredJuegos: Juego[] = [];

  /** Estado de carga */
  loading: boolean = true;

  /** Mensaje de error si algo falla */
  errorMessage: string = '';

  /** Término de búsqueda actual */
  searchTerm: string = '';

  // ========================================
  // SERVICIOS INYECTADOS
  // ========================================

  private bibliotecaService = inject(BibliotecaService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    console.log("📚 Mi Biblioteca inicializada");
    
    // Obtener usuario de la sesión
    this.currentUserId = this.usuarioService.obtenerUsuarioDeSesion();
    
    // Verificar si hay usuario autenticado
    if (this.currentUserId) {
      console.log(`👤 Usuario en sesión: ${this.currentUserId}`);
      this.cargarBiblioteca();
    } else {
      console.warn('⚠️ No hay usuario autenticado');
      this.errorMessage = 'Debes iniciar sesión para ver tu biblioteca';
      this.loading = false;
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/iniciar-sesion']);
      }, 2000);
    }
  }

  // ========================================
  // MÉTODOS PÚBLICOS - CARGA DE DATOS
  // ========================================

  /**
   * Carga los juegos de la biblioteca del usuario
   */
  cargarBiblioteca(): void {
    this.loading = true;
    this.errorMessage = '';

    // No necesita pasar el ID, el servicio lo obtiene de la sesión
    this.bibliotecaService.obtenerJuegos().subscribe({
      next: (data) => {
        console.log('✅ Biblioteca cargada:', data.length, 'juegos');
        this.juegos = data;
        this.filteredJuegos = data;
        this.loading = false;

        // Extraer opciones de filtros
        this.extractFilterOptions();
      },
      error: (error) => {
        console.error('❌ Error al cargar biblioteca:', error);
        
        // Mensaje más descriptivo según el error
        if (error.message.includes('iniciar sesión')) {
          this.errorMessage = error.message;
          // Redirigir al login
          setTimeout(() => {
            this.router.navigate(['/iniciar-sesion']);
          }, 2000);
        } else {
          this.errorMessage = 'Error al cargar tu biblioteca. Por favor, intenta de nuevo.';
        }
        
        this.loading = false;
      }
    });
  }

  /**
   * Extrae las opciones únicas de géneros y plataformas
   * TODO: Implementar cuando se agregue soporte para géneros y plataformas desde el backend
   */
  private extractFilterOptions(): void {
    // Pendiente: implementar con datos del backend
    console.log('⚠️ Extracción de filtros pendiente de implementación');
  }

  // ========================================
  // MÉTODOS PÚBLICOS - EVENT HANDLERS
  // ========================================

  /**
   * Maneja el evento de búsqueda
   */
  handleSearch(searchTerm: string): void {
    console.log('🔍 Búsqueda en biblioteca:', searchTerm);
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  /**
   * Maneja el clic en una tarjeta de juego
   */
  handleGameClick(juego: Juego): void {
    console.log('👁️ Ver detalles de:', juego.nombre);
    this.router.navigate(['/juego', juego.id]);
  }

  /**
   * Maneja la eliminación de un juego de la biblioteca
   */
  handleRemoveFromBiblio(juego: Juego): void {
    console.log('🗑️ Eliminar de biblioteca:', juego.nombre);

    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar "${juego.nombre}" de tu biblioteca?`);

    if (confirmDelete) {
      this.bibliotecaService.eliminarJuego(juego.id).subscribe({
        next: () => {
          console.log('✅ Juego eliminado');
          // Remover del array local
          this.juegos = this.juegos.filter(j => j.id !== juego.id);
          this.applyFilters();
        },
        error: (error) => {
          console.error('❌ Error al eliminar:', error);
          alert('Error al eliminar el juego. Por favor, intenta de nuevo.');
        }
      });
    }
  }

  /**
   * Obtiene el mensaje apropiado cuando no hay resultados
   */
  getEmptyMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No se encontraron juegos con los filtros aplicados';
    }
    return 'Tu biblioteca está vacía. ¡Explora el catálogo y agrega juegos!';
  }

  // ========================================
  // MÉTODOS PRIVADOS - LÓGICA DE FILTRADO
  // ========================================

  /**
   * Aplica búsqueda por texto
   */
  private applyFilters(): void {
    let result = [...this.juegos];

    // Aplicar búsqueda por texto
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(juego =>
        juego.nombre.toLowerCase().includes(term)
      );
    }

    this.filteredJuegos = result;

    console.log(`📋 Búsqueda aplicada en biblioteca: ${result.length} de ${this.juegos.length} juegos`);
  }

  // ========================================
  // MÉTODOS PÚBLICOS - UTILIDADES
  // ========================================

  /**
   * Verifica si hay búsqueda activa
   */
  hasActiveFilters(): boolean {
    return !!this.searchTerm.trim();
  }

  /**
   * Obtiene estadísticas de la biblioteca
   */
  getStats() {
    return {
      total: this.juegos.length
    };
  }

  /**
   * Recarga la biblioteca completa
   */
  reloadBiblioteca(): void {
    this.searchTerm = '';
    this.cargarBiblioteca();
  }
}
