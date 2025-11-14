import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Juego } from "@interfaces/juego.interface";
import { GameFilter } from "@interfaces/game-filter.interface";
import { JuegoService } from "@servicios/juego.service";
import { BibliotecaService } from "@servicios/biblioteca.service";

import { GameSearchComponent } from "@modules/catalogo-juegos/components/game-search/game-search.component";
import { GameFiltersComponent } from "@modules/catalogo-juegos/components/game-filters/game-filters.component";
import { GameGridComponent } from "@modules/catalogo-juegos/components/game-grid/game-grid.component";
import { CarritoComponent } from "@modules/carrito-component/carrito-component";

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
        this.juegos = data;
        this.filteredJuegos = data;
        this.loading = false;

        this.extractFilterOptions();
      },
      error: (error) => {
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

 
  }

  cargarPlataformas(){
    this.plataformaService.obtenerPlataformas().subscribe({
      next : (data) => {
        this.plataformas = data;
      },
      error : (data) => {
      },
      complete : () =>{
      }
    })
  }
  cargarGeneros(){
    this.generoService.obtenerGeneros().subscribe({
      next : (data) => {
        this.generos = data;
      },
      error : (data) => {
      },
      complete : () =>{
      }
    })
  }

  handleSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  navigateToWishlist(): void {
  this.router.navigate(['/wishlist']);
  }


  handleFilterChange(filters: GameFilter): void {
    console.log('🎛️ Filtros cambiados:', filters);

    this.filters = filters;
    this.selectedSort = filters.sortBy;
    this.selectedGenre = filters.genero;
    this.selectedPlatform = filters.plataforma;

    this.applyFilters();
  }

  viewDetails(juego: Juego): void {
   
  }


  addToLibrary(juego: Juego): void {
    alert(`"${juego.nombre}" se agregará a tu biblioteca (pendiente de implementar)`);
  }

  
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

  handleGameClick(juego: Juego): void {
    this.router.navigate(['/juego', juego.id]);
  }

  handleAddToBiblio(juego: Juego): void {

    this.bibliotecaService.agregarJuego(juego).subscribe({
      next: () => {
        alert(`✅ "${juego.nombre}" se agregó a tu biblioteca!`);
      },
      error: (error: any) => {
        alert('❌ Error al agregar el juego. Por favor, intenta de nuevo.');
      }
    });
  }


  handleToggleFavorite(juego: Juego): void {
    console.log('❤️ Toggle favorito:', juego.nombre);
    alert(`"${juego.nombre}" favorito toggled (pendiente de implementar)`);
  }

  private applyFilters(): void {

    
    let result = [...this.juegos];


    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      this.juegoService.saveTermInSession(term);
      result = result.filter(juego =>
        juego.nombre ? juego.nombre.toLowerCase().includes(term) : false
      );
    }

    
    if (this.selectedGenre) {
		this.juegoService.saveGenreInSession(this.selectedGenre);
      result = result.filter(juego => Array.isArray(juego.genero) &&
        juego?.genero.some(g => g.nombre?.toLocaleLowerCase() == this.selectedGenre.toLocaleLowerCase())
      );
    }
    
    
    if (this.selectedPlatform) {
		this.juegoService.savePlatformInSession(this.selectedPlatform);
      result = result.filter(juego => Array.isArray(juego.plataforma) &&
        juego.plataforma.some(p => p.nombre?.toLocaleLowerCase() == this.selectedPlatform.toLocaleLowerCase()));
    }
    

    if (this.selectedSort) {
		this.juegoService.saveSortInSession(this.selectedSort);
      result = this.sortByName(result, this.selectedSort);
    }

    this.filteredJuegos = result;

    
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


  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedGenre) count++;
    if (this.selectedPlatform) count++;
    if (this.selectedSort) count++;
    if (this.searchTerm.trim()) count++;
    return count;
  }

 
  hasActiveFilters(): boolean {
    return this.getActiveFiltersCount() > 0;
  }

 
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
