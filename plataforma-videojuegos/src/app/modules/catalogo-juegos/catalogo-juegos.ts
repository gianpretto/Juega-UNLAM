import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Juego } from "@interfaces/juego.interface";
import { GameFilter } from "@interfaces/game-filter.interface";
import { JuegoService } from "@servicios/juego.service";
import { BibliotecaService } from "@servicios/biblioteca.service";

// Componentes hijos
import { GameSearchComponent } from "@modules/catalogo-juegos/components/game-search/game-search.component";
import { GameFiltersComponent } from "@modules/catalogo-juegos/components/game-filters/game-filters.component";
import { GameGridComponent } from "@modules/catalogo-juegos/components/game-grid/game-grid.component";
import { CarritoComponent } from "@modules/carrito-component/carrito-component";
// INTERFACES
import { FilterOption } from "@interfaces/filter-options.interface";
import { Genero } from "@interfaces/genero.interface";
import { GeneroService } from "@servicios/genero/genero.service";
import { PlataformaService } from "@servicios/plataforma/plataforma.service";
import { Plataforma } from "@interfaces/plataforma.interface";
import { JuegoPlataformaGenero } from "@general/interfaces/juego-plafatorma-genero.interface";


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
  juegos: JuegoPlataformaGenero[] = [];
  filteredJuegos: JuegoPlataformaGenero[] = [];
  selectedOptions: FilterOption[] = [];
  generos:Genero[] =[];
  plataformas:Plataforma[] =[];
  loading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  availableGenres: string[] = [];
  availablePlatforms: string[] = [];

  filters: GameFilter = {
    sortBy: '',
    genero: '',
    plataforma: ''
  };


  sortOptions: { label: string; value: string }[] = [
    { label: 'Nombre A-Z', value: 'name-asc' },
    { label: 'Nombre Z-A', value: 'name-desc' }
  ];


  genreOptions: { label: string; value: string }[] = [];

  
  platformOptions: { label: string; value: string }[] = [];


  selectedGenre: string = '';


  selectedPlatform: string = '';

  selectedSort: string = '';

 
  private juegoService = inject(JuegoService);
  private bibliotecaService = inject(BibliotecaService);
  private generoService = inject(GeneroService);
  private plataformaService = inject(PlataformaService);

  
  ngOnInit(): void {
    console.log("🎮 Catálogo de Juegos inicializado");
    this.cargarPlataformas();
    this.cargarGeneros();
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


  private extractFilterOptions(): void {
    
    const genresSet = new Set<string>();
    this.generos.forEach(g => {
      if (g.nombre) {
        genresSet.add(g.nombre);
      }
    });
    this.availableGenres = Array.from(genresSet).sort();
    this.genreOptions = this.availableGenres.map(genre => ({
      label: genre,
      value: genre
    }));

    const platformsSet = new Set<string>();
    this.plataformas.forEach(g=> {
      if(g.nombre){
        platformsSet.add(g.nombre);
      }
    })
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

  cargarPlataformas(){
    this.plataformaService.obtenerPlataformas().subscribe({
      next : (data) => {
        this.plataformas = data;
      },
      error : (data) => {
        console.log("ERRO AL TRAER LAS PLATAFORMAS")
      },
      complete : () =>{
        console.log("PLATAFORMAS TRAIDAS")
      }
    })
  }
  cargarGeneros(){
    this.generoService.obtenerGeneros().subscribe({
      next : (data) => {
        this.generos = data;
      },
      error : (data) => {
        console.log("ERROR AL TRAER LOS GENEROS")
      },
      complete : () =>{
        console.log("GENEROS TRAIDOS")
      }
    })
  }

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
    this.router.navigate(['/juego', juego.id]);
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

  private applyFilters(): void {

    
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
      console.log("NOMBRE DE GENERO SELECCIONADO:",this.selectedGenre);
		this.juegoService.saveGenreInSession(this.selectedGenre);
      result = result.filter(juego => Array.isArray(juego.genero) &&
        juego?.genero.some(g => g.nombre?.toLocaleLowerCase() == this.selectedGenre.toLocaleLowerCase())
      );
    }
    
    
    // 3. Filtrar por plataforma
    if (this.selectedPlatform) {
            console.log("NOMBRE DE PLATAFORMA SELECCIONADA:",this.selectedPlatform);
		this.juegoService.savePlatformInSession(this.selectedPlatform);
      result = result.filter(juego => Array.isArray(juego.plataforma) &&
        juego.plataforma.some(p => p.nombre?.toLocaleLowerCase() == this.selectedPlatform.toLocaleLowerCase()));
    }
    

    // 4. Aplicar ordenamiento
    if (this.selectedSort) {
		this.juegoService.saveSortInSession(this.selectedSort);
      result = this.sortByName(result, this.selectedSort);
    }

    this.filteredJuegos = result;

    console.log(`📋 Filtros aplicados: ${result.length} de ${this.juegos.length} juegos`);
    
  }

  private sortByName(games: JuegoPlataformaGenero[], sortType: string): JuegoPlataformaGenero[] {
    const sorted = [...games];
    
    switch (sortType) {
      case 'name-asc':
        return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
      
      case 'name-desc':
        return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
      
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


  getEmptyMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No se encontraron juegos con los filtros aplicados';
    }
    return 'No se encontraron juegos';
  }

  navigateToProfile(): void {
    this.router.navigate(['/usuario-perfil']);
  }

}
