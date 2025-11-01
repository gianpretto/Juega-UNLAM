import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Juego } from "@interfaces/juego.interface";
import { GameFilter } from "@interfaces/game-filter.interface";
import { BibliotecaService } from "@servicios/biblioteca.service";

// Componentes hijos reutilizables
import { GameSearchComponent } from "@modules/catalogo-juegos/components/game-search/game-search.component";
import { GameFiltersComponent } from "@modules/catalogo-juegos/components/game-filters/game-filters.component";
import { GameGridComponent } from "@modules/catalogo-juegos/components/game-grid/game-grid.component";

/**
 * SMART COMPONENT - Mi Biblioteca Personal
 *
 * RESPONSABILIDADES:
 * - Obtener juegos guardados del servicio de biblioteca
 * - Gestionar estado (loading, error, vacío)
 * - Aplicar lógica de filtros y búsqueda
 * - Coordinar componentes hijos
 * - Gestionar favoritos y eliminación de juegos
 *
 * NO hace:
 * - Renderizar tarjetas directamente
 * - Manejar UI de filtros
 * - Estilos visuales complejos
 */
@Component({
  selector: 'app-mi-biblioteca',
  standalone: true,
  imports: [
    CommonModule,
    GameSearchComponent,
    GameFiltersComponent,
    GameGridComponent
  ],
  templateUrl: './mi-biblioteca.html',
  styleUrls: ['./mi-biblioteca.css']
})
export class MiBibliotecaComponent implements OnInit {

  // ========================================
  // PROPIEDADES DE ESTADO
  // ========================================

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

  /** IDs de juegos marcados como favoritos */
  favoritosIds: Set<number> = new Set();

  // ========================================
  // OPCIONES PARA FILTROS
  // ========================================

  /** Filtros actuales en formato para componente hijo */
  filters: GameFilter = {
    sortBy: '',
    genero: '',
    plataforma: ''
  };

  /** Opciones para el dropdown de ordenamiento */
  sortOptions: { label: string; value: string }[] = [
    { label: 'Nombre A-Z', value: 'name-asc' },
    { label: 'Nombre Z-A', value: 'name-desc' },
    { label: 'Agregado recientemente', value: 'date-desc' },
    { label: 'Agregado hace tiempo', value: 'date-asc' },
    { label: 'Mejor valorados', value: 'rating-desc' }
  ];

  /** Opciones para el dropdown de géneros (se llena dinámicamente) */
  genreOptions: { label: string; value: string }[] = [];

  /** Opciones para el dropdown de plataformas (se llena dinámicamente) */
  platformOptions: { label: string; value: string }[] = [];

  /** Géneros únicos disponibles */
  availableGenres: string[] = [];

  /** Plataformas únicas disponibles */
  availablePlatforms: string[] = [];

  /** Género seleccionado */
  selectedGenre: string = '';

  /** Plataforma seleccionada */
  selectedPlatform: string = '';

  /** Ordenamiento seleccionado */
  selectedSort: string = '';

  // ========================================
  // SERVICIOS INYECTADOS
  // ========================================

  private bibliotecaService = inject(BibliotecaService);

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    console.log("📚 Mi Biblioteca inicializada");
    this.cargarBiblioteca();
    this.cargarFavoritos();
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
        this.errorMessage = 'Error al cargar tu biblioteca. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  /**
   * Carga los IDs de juegos marcados como favoritos
   */
  cargarFavoritos(): void {
    this.bibliotecaService.obtenerFavoritos().subscribe({
      next: (favoritos) => {
        this.favoritosIds = new Set(favoritos);
        console.log('❤️ Favoritos cargados:', this.favoritosIds.size);
      },
      error: (error) => {
        console.error('❌ Error al cargar favoritos:', error);
      }
    });
  }

  /**
   * Extrae las opciones únicas de géneros y plataformas
   */
  private extractFilterOptions(): void {
    /*
    TODO: MODIFICAR ESTO PARA QUE TRAIGA DEL SERVICIO LOS GENEROS
    // Extraer géneros únicos
    const genresSet = new Set<string>();
    this.juegos.forEach(juego => {
      juego.genres?.forEach(genre => genresSet.add(genre.name));
    });
    this.availableGenres = Array.from(genresSet).sort();
    this.genreOptions = this.availableGenres.map(genre => ({
      label: genre,
      value: genre
    }));

    // Extraer plataformas únicas
    const platformsSet = new Set<string>();
    this.juegos.forEach(juego => {
      juego.parent_platforms?.forEach(pp => platformsSet.add(pp.platform.name));
    });
    this.availablePlatforms = Array.from(platformsSet).sort();
    this.platformOptions = this.availablePlatforms.map(platform => ({
      label: platform,
      value: platform
    }));

    console.log('📊 Filtros de biblioteca:', {
      genres: this.availableGenres.length,
      platforms: this.availablePlatforms.length
    });
    */
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
   * Maneja cambios en los filtros
   */
  handleFilterChange(filters: GameFilter): void {
    console.log('🎛️ Filtros cambiados:', filters);

    this.filters = filters;
    this.selectedSort = filters.sortBy;
    this.selectedGenre = filters.genero;
    this.selectedPlatform = filters.plataforma;

    this.applyFilters();
  }

  /**
   * Limpia todos los filtros activos
   */
  clearFilters(): void {
    console.log('🗑️ Limpiar filtros de biblioteca');
    this.searchTerm = '';
    this.selectedGenre = '';
    this.selectedPlatform = '';
    this.selectedSort = '';
    this.filters = {
      sortBy: '',
      genero: '',
      plataforma: ''
    };
    this.applyFilters();
  }

  /**
   * Maneja el clic en una tarjeta de juego
   */
  handleGameClick(juego: Juego): void {
    console.log('👁️ Ver detalles de:', juego.nombre);
    // TODO: Navegar a página de detalles
    // this.router.navigate(['/juegos', juego.id]);
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

          // También quitar de favoritos si estaba
          this.favoritosIds.delete(juego.id);
        },
        error: (error) => {
          console.error('❌ Error al eliminar:', error);
          alert('Error al eliminar el juego. Por favor, intenta de nuevo.');
        }
      });
    }
  }

  /**
   * Maneja el toggle de favorito
   */
  handleToggleFavorite(juego: Juego): void {
    console.log('❤️ Toggle favorito:', juego.nombre);

    const esFavorito = this.favoritosIds.has(juego.id);

    if (esFavorito) {
      // Quitar de favoritos
      this.bibliotecaService.quitarDeFavoritos(juego.id).subscribe({
        next: () => {
          this.favoritosIds.delete(juego.id);
          console.log('💔 Quitado de favoritos');
        },
        error: (error) => {
          console.error('❌ Error al quitar de favoritos:', error);
        }
      });
    } else {
      // Agregar a favoritos
      this.bibliotecaService.agregarAFavoritos(juego.id).subscribe({
        next: () => {
          this.favoritosIds.add(juego.id);
          console.log('❤️ Agregado a favoritos');
        },
        error: (error) => {
          console.error('❌ Error al agregar a favoritos:', error);
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
   * Aplica todos los filtros activos
   */
  private applyFilters(): void {
    let result = [...this.juegos];

    // 1. Aplicar búsqueda por texto
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(juego =>
        juego.nombre.toLowerCase().includes(term)
      );
    }

    /*
    TODO: MODIFICAR PARA QUE VENGA DEL SERVICIO EN VEZ DE QUE EL JUEGO TENGA EL GENERO DENTRO
    // 2. Filtrar por género
    if (this.selectedGenre) {
      result = result.filter(juego =>
        juego.genres?.some(g => g.name === this.selectedGenre)
      );
    }

    // 3. Filtrar por plataforma
    if (this.selectedPlatform) {
      result = result.filter(juego =>
        juego.parent_platforms?.some(p => p.platform.name === this.selectedPlatform)
      );
    }
 */

    // 4. Aplicar ordenamiento
    if (this.selectedSort) {
      result = this.sortGames(result, this.selectedSort);
    }

    this.filteredJuegos = result;

    console.log(`📋 Filtros aplicados en biblioteca: ${result.length} de ${this.juegos.length} juegos`);
  }

  /**
   * Ordena la lista de juegos
   */
  private sortGames(games: Juego[], sortType: string): Juego[] {
    const sorted = [...games];

    switch (sortType) {
      case 'name-asc':
        return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));

      case 'name-desc':
        return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
        

      case 'date-desc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.released).getTime();
          const dateB = new Date(b.released).getTime();
          return dateB - dateA;
        });

      case 'date-asc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.released).getTime();
          const dateB = new Date(b.released).getTime();
          return dateA - dateB;
        });

      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      default:
        return sorted;
    }
  }

  // ========================================
  // MÉTODOS PÚBLICOS - UTILIDADES
  // ========================================

  /**
   * Verifica si hay filtros activos
   */
  hasActiveFilters(): boolean {
    return !!(
      this.searchTerm.trim() ||
      this.selectedGenre ||
      this.selectedPlatform ||
      this.selectedSort
    );
  }

  /**
   * Cuenta cuántos filtros están activos
   */
  getActiveFiltersCount(): number {
    let count = 0;
    if (this.searchTerm.trim()) count++;
    if (this.selectedGenre) count++;
    if (this.selectedPlatform) count++;
    if (this.selectedSort) count++;
    return count;
  }

  /**
   * Verifica si un juego es favorito
   */
  isFavorite(juegoId: number): boolean {
    return this.favoritosIds.has(juegoId);
  }

  /**
   * Obtiene estadísticas de la biblioteca
   */
  getStats() {
    return {
      total: this.juegos.length,
      favoritos: this.favoritosIds.size,
      genres: this.availableGenres.length,
      platforms: this.availablePlatforms.length
    };
  }

  /**
   * Recarga la biblioteca completa
   */
  reloadBiblioteca(): void {
    this.clearFilters();
    this.cargarBiblioteca();
    this.cargarFavoritos();
  }
}
