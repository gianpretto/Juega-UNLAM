import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Juego } from "../../interfaces/juego.interface";
import { GameFilter } from "../../interfaces/game-filter.interface";
import { JuegoService } from "../../../../core/services/juego.service";
import { BibliotecaService } from "../../../../core/services/biblioteca.service";

// Componentes hijos
import { GameSearchComponent } from "../../components/game-search/game-search.component";
import { GameFiltersComponent } from "../../components/game-filters/game-filters.component";
import { GameGridComponent } from "../../components/game-grid/game-grid.component";

/**
 * SMART COMPONENT - Catálogo de Juegos
 *
 * RESPONSABILIDADES:
 * - Obtener datos del servicio de juegos (API propia)
 * - Gestionar estado (loading, error)
 * - Aplicar lógica de filtros y búsqueda
 * - Coordinar componentes hijos
 * - Extraer opciones de filtros disponibles
 *
 * NO hace:
 * - Renderizar tarjetas directamente
 * - Manejar UI de filtros
 * - Estilos visuales complejos
 */
@Component({
  selector: 'app-catalogo-juegos',
  standalone: true,
  imports: [
    CommonModule,
    GameSearchComponent,
    GameFiltersComponent,
    GameGridComponent
  ],
  templateUrl: './catalogo-juegos.html',
  styleUrls: ['./catalogo-juegos.css']
})
export class CatalogoJuegosComponent implements OnInit {

  // ========================================
  // PROPIEDADES DE ESTADO
  // ========================================

  /** Lista completa de juegos obtenidos de RAWG */
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
  // OPCIONES PARA FILTROS
  // ========================================

  /** Géneros únicos disponibles para filtrar */
  availableGenres: string[] = [];

  /** Plataformas únicas disponibles para filtrar */
  availablePlatforms: string[] = [];

  // ========================================
  // FILTROS ACTIVOS
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
    { label: 'Precio: menor a mayor', value: 'price-asc' },
    { label: 'Precio: mayor a menor', value: 'price-desc' }
  ];

  /** Opciones para el dropdown de géneros (se llena dinámicamente) */
  genreOptions: { label: string; value: string }[] = [];

  /** Opciones para el dropdown de plataformas (se llena dinámicamente) */
  platformOptions: { label: string; value: string }[] = [];

  /** Género seleccionado (vacío = todos) */
  selectedGenre: string = '';

  /** Plataforma seleccionada (vacía = todas) */
  selectedPlatform: string = '';

  /** Ordenamiento seleccionado */
  selectedSort: string = '';

  // ========================================
  // SERVICIOS INYECTADOS
  // ========================================

  private juegoService = inject(JuegoService);
  private bibliotecaService = inject(BibliotecaService);

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    console.log("🎮 Catálogo de Juegos inicializado");
    this.cargarJuegos();
  }

  // ========================================
  // MÉTODOS PÚBLICOS - CARGA DE DATOS
  // ========================================

  /**
   * Carga los juegos desde el servicio RAWG
   */
  cargarJuegos(): void {
    this.loading = true;
    this.errorMessage = '';

    this.juegoService.getJuegos().subscribe({
      next: (data) => {
        console.log('✅ Juegos cargados:', data.length);
        this.juegos = data;
        this.filteredJuegos = data;
        this.loading = false;

        // Extraer opciones de filtros
        this.extractFilterOptions();
      },
      error: (error) => {
        console.error('❌ Error al cargar juegos:', error);
        this.errorMessage = 'Error al cargar el catálogo de juegos. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  /**
   * Extrae las opciones únicas de géneros y plataformas
   * de los juegos cargados para poblar los filtros
   */
  private extractFilterOptions(): void {
    // Extraer géneros únicos
    const genresSet = new Set<string>();
    this.juegos.forEach(juego => {
      if (juego.genero?.nombre) {
        genresSet.add(juego.genero.nombre);
      }
    });
    this.availableGenres = Array.from(genresSet).sort();
    this.genreOptions = this.availableGenres.map(genre => ({
      label: genre,
      value: genre
    }));

    // Extraer plataformas únicas
    const platformsSet = new Set<string>();
    this.juegos.forEach(juego => {
      juego.plataformas?.forEach(jp => {
        if (jp.plataforma?.nombre) {
          platformsSet.add(jp.plataforma.nombre);
        }
      });
    });
    this.availablePlatforms = Array.from(platformsSet).sort();
    this.platformOptions = this.availablePlatforms.map(platform => ({
      label: platform,
      value: platform
    }));

    console.log('📊 Filtros disponibles:', {
      genres: this.availableGenres.length,
      platforms: this.availablePlatforms.length
    });
  }

  // ========================================
  // MÉTODOS PÚBLICOS - EVENT HANDLERS
  // ========================================

  /**
   * Maneja el evento de búsqueda del componente hijo
   * @param searchTerm - Término de búsqueda ingresado
   */
  handleSearch(searchTerm: string): void {
    console.log('🔍 Búsqueda:', searchTerm);
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  /**
   * Maneja cambios en los filtros del componente hijo
   * @param filters - Objeto con género, plataforma y ordenamiento
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
   * Maneja el clic en una tarjeta de juego
   * @param juego - Juego seleccionado
   */
  viewDetails(juego: Juego): void {
    console.log('👁️ Ver detalles de:', juego.nombre);
    // TODO: Navegar a página de detalles
    // this.router.navigate(['/juegos', juego.id]);
  }

  /**
   * Maneja la acción de agregar juego a biblioteca
   * @param juego - Juego a agregar
   */
  addToLibrary(juego: Juego): void {
    console.log('➕ Agregar a biblioteca:', juego.nombre);
    // TODO: Implementar lógica con BibliotecaService
    alert(`"${juego.nombre}" se agregará a tu biblioteca (pendiente de implementar)`);
  }

  /**
   * Limpia todos los filtros activos
   */
  clearFilters(): void {
    console.log('🗑️ Limpiar filtros');
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
   * @param juego - Juego seleccionado
   */
  handleGameClick(juego: Juego): void {
    console.log('👁️ Ver detalles de:', juego.nombre);
    // TODO: Navegar a página de detalles
    // this.router.navigate(['/juegos', juego.id]);
  }

  /**
   * Maneja la acción de agregar juego a biblioteca
   * @param juego - Juego a agregar
   */
  handleAddToBiblio(juego: Juego): void {
    console.log('➕ Agregar a biblioteca:', juego.nombre);

    this.bibliotecaService.agregarJuego(juego).subscribe({
      next: () => {
        alert(`✅ "${juego.nombre}" se agregó a tu biblioteca!`);
      },
      error: (error: any) => {
        console.error('Error al agregar:', error);
        alert('❌ Error al agregar el juego. Por favor, intenta de nuevo.');
      }
    });
  }

  /**
   * Maneja la acción de marcar como favorito
   * @param juego - Juego a marcar/desmarcar
   */
  handleToggleFavorite(juego: Juego): void {
    console.log('❤️ Toggle favorito:', juego.nombre);
    // TODO: Implementar lógica de favoritos
    alert(`"${juego.nombre}" favorito toggled (pendiente de implementar)`);
  }

  /**
   * Obtiene el mensaje apropiado cuando no hay resultados
   */
  getEmptyMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No se encontraron juegos con los filtros aplicados';
    }
    return 'No se encontraron juegos';
  }

  // ========================================
  // MÉTODOS PRIVADOS - LÓGICA DE FILTRADO
  // ========================================

  /**
   * Aplica todos los filtros activos a la lista de juegos
   */
  private applyFilters(): void {
    let result = [...this.juegos];

    // 1. Aplicar búsqueda por texto
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(juego =>
        juego.nombre.toLowerCase().includes(term) ||
        juego.descripcion?.toLowerCase().includes(term) ||
        juego.desarrollador?.nombre.toLowerCase().includes(term)
      );
    }

    // 2. Filtrar por género
    if (this.selectedGenre) {
      result = result.filter(juego =>
        juego.genero?.nombre === this.selectedGenre
      );
    }

    // 3. Filtrar por plataforma
    if (this.selectedPlatform) {
      result = result.filter(juego =>
        juego.plataformas?.some(jp => jp.plataforma?.nombre === this.selectedPlatform)
      );
    }

    // 4. Aplicar ordenamiento
    if (this.selectedSort) {
      result = this.sortGames(result, this.selectedSort);
    }

    this.filteredJuegos = result;

    console.log(`📋 Filtros aplicados: ${result.length} de ${this.juegos.length} juegos`);
  }

  /**
   * Ordena la lista de juegos según el criterio seleccionado
   * @param games - Lista de juegos a ordenar
   * @param sortType - Tipo de ordenamiento
   * @returns Lista ordenada
   */
  private sortGames(games: Juego[], sortType: string): Juego[] {
    const sorted = [...games];

    switch (sortType) {
      case 'name-asc':
        return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));

      case 'name-desc':
        return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));

      case 'price-asc':
        return sorted.sort((a, b) => a.precio - b.precio);

      case 'price-desc':
        return sorted.sort((a, b) => b.precio - a.precio);

      default:
        return sorted;
    }
  }

  // ========================================
  // MÉTODOS PÚBLICOS - UTILIDADES
  // ========================================

  /**
   * Cuenta cuántos filtros están activos
   * @returns Número de filtros activos
   */
  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedGenre) count++;
    if (this.selectedPlatform) count++;
    if (this.selectedSort) count++;
    if (this.searchTerm.trim()) count++;
    return count;
  }

  /**
   * Verifica si hay filtros activos
   * @returns true si hay algún filtro activo
   */
  hasActiveFilters(): boolean {
    return this.getActiveFiltersCount() > 0;
  }

  /**
   * Recarga el catálogo completo
   */
  reloadCatalog(): void {
    this.clearFilters();
    this.cargarJuegos();
  }
}
