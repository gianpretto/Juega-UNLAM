import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Juego } from "@interfaces/juego.interface";
import { GameFilter } from "@interfaces/game-filter.interface";
import { JuegoService } from "@servicios/juego.service";
import { BibliotecaService } from "@servicios/biblioteca.service";

// Componentes hijos
import { GameSearchComponent } from "@modules/catalogo-juegos/components/game-search/game-search.component";
import { GameFiltersComponent } from "@modules/catalogo-juegos/components/game-filters/game-filters.component";
import { GameGridComponent } from "@modules/catalogo-juegos/components/game-grid/game-grid.component";
import { FilterOption } from "@interfaces/filter-options.interface";
import { CarritoComponent } from "@modules/carrito-component/carrito-component";
import { Genero } from "@interfaces/genero.interface";
import { Plataforma } from "@interfaces/plataforma.interface";
import { GeneroService } from "@servicios/genero/genero.service";
import { PlataformaService } from "@servicios/plataforma/plataforma.service";

import { Router } from "@angular/router"

/**
 * SMART COMPONENT - Catálogo de Juegos RAWG
 *
 * RESPONSABILIDADES:
 * - Obtener datos del servicio RAWG
 * - Gestionar estado (loading, error)
 * - Aplicar lógica de filtros y búsqueda
 * - Coordinar componentes hijos
 * - Extraer opciones de filtros disponibles
 *
 * NO hace:
 * - Renderizar tarjetas directamente
 * - Manejar UI de filtros (por ahora sin componente de filtros)
 * - Estilos visuales complejos
 */
@Component({
  selector: 'app-catalogo-juegos',
  standalone: true,
  imports: [
    CommonModule,
    GameSearchComponent,
    GameFiltersComponent,
    GameGridComponent,
    CarritoComponent
  ],
  templateUrl: './catalogo-juegos.html',
  styleUrls: ['./catalogo-juegos.css']
})
export class CatalogoJuegosComponent implements OnInit {


  router = inject(Router);

  // ========================================
  // PROPIEDADES DE ESTADO
  // ========================================
  

  /** Lista completa de juegos obtenidos de RAWG */
  juegos: Juego[] = [];

  /** Lista filtrada que se muestra en el grid */
  filteredJuegos: Juego[] = [];

  selectedOptions: FilterOption[] = [];

  genero!:Genero;
  plataforma!:Plataforma;

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
    { label: 'Más recientes', value: 'date-desc' },
    { label: 'Más antiguos', value: 'date-asc' }
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
  private generoService = inject(GeneroService)
  private plataformaService = inject(PlataformaService)

  // ========================================
  // LIFECYCLE HOOKS
  // ========================================

  ngOnInit(): void {
    console.log("🎮 Catálogo de Juegos inicializado");
	this.cargarJuegos();
    this.selectedOptions = this.juegoService.getSessionFilteredGames();
	const hasActiveFilters = this.selectedOptions.some(opt => opt.value !== '');

	if(hasActiveFilters){
	this.searchTerm = this.selectedOptions.find(o => o.name === "term")?.value || '';
	this.selectedGenre = this.selectedOptions.find(o => o.name === "genre")?.value || '';
	this.selectedPlatform = this.selectedOptions.find(o => o.name === "platform")?.value || '';
	this.selectedSort = this.selectedOptions.find(o => o.name === "sort")?.value || '';
	this.applyFilters();
	}
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
   * TODO: ACA HAY QUE CAMBIARLO
   */
  private extractFilterOptions(): void {
    // Extraer géneros únicos
    
    /*
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

    console.log('📊 Filtros disponibles:', {
      genres: this.availableGenres.length,
      platforms: this.availablePlatforms.length
    });
    */
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

  navigateToWishlist(): void {
  this.router.navigate(['/wishlist']);
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
	this.juegoService.clearFilters();
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
  /*
  TODO: ACA HAY QUE CAMBIAR, deja los metodos de saveInSession como estan
  */
  private applyFilters(): void {
  /*
  let result = [...this.juegos];

  // 1. Aplicar búsqueda por texto
  if (this.searchTerm.trim()) {
    const term = this.searchTerm.toLowerCase();
    this.juegoService.saveTermInSession(term);
    result = result.filter(juego =>
      juego.nombre ? juego.nombre.toLowerCase().includes(term) : false
    );
  }

  // 2. Filtrar por género
  if (this.selectedGenre) {
    this.juegoService.saveGenreInSession(this.selectedGenre);
    result = result.filter(juego =>
      juego.genres?.some(g => g.name === this.selectedGenre)
    );
  }

  // 3. Filtrar por plataforma
  if (this.selectedPlatform) {
    this.juegoService.savePlatformInSession(this.selectedPlatform);
    result = result.filter(juego =>
      juego.parent_platforms?.some(p => p.platform.name === this.selectedPlatform)
    );
  }

  // 4. Aplicar ordenamiento
  if (this.selectedSort) {
    this.juegoService.saveSortInSession(this.selectedSort);
    result = this.sortGames(result, this.selectedSort);
  }

  this.filteredJuegos = result;

  console.log(`📋 Filtros aplicados: ${result.length} de ${this.juegos.length} juegos`);
  */
}


  /**
   * Ordena la lista de juegos según el criterio seleccionado
   * @param games - Lista de juegos a ordenar
   * @param sortType - Tipo de ordenamiento
   * @returns Lista ordenada
   */
  /*
  TODO: ACA HAY QUE CAMBIAR
  */
  private sortGames(games: Juego[], sortType: string): Juego[] {
    /*
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
          return dateB - dateA; // Más reciente primero
        });

      case 'date-asc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.released).getTime();
          const dateB = new Date(b.released).getTime();
          return dateA - dateB; // Más antiguo primero
        });

      default:
        return sorted;
    }
    */
   //TODO: ESTO VUELA, ES PARA QUE COMPILE
   return [];
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

  navigateToProfile(): void {
    this.router.navigate(['/usuario-perfil']);
  }

}
