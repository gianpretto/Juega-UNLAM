import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Juego } from "@interfaces/juego.interface";
import { GameFilter } from "@interfaces/game-filter.interface";
import { JuegoService } from "@servicios/juego.service";

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
  private juegoService = inject(JuegoService);
  private generoService = inject(GeneroService);
  private plataformaService = inject(PlataformaService);



  juegos: JuegoPlataformaGenero[] = [];
  juegosFiltrados: JuegoPlataformaGenero[] = [];
  filtrosSeleccionados: FilterOption[] = [];
  generos:Genero[] =[];
  plataformas:Plataforma[] =[];
  loading: boolean = true;
  errorMessage: string = '';
  nombreBuscado: string = '';
  generosDisponibles: string[] = [];
  plataformasDisponibles: string[] = [];

  filtros: GameFilter = {
    ordenamiento: '',
    genero: '',
    plataforma: ''
  };


  opcionesDeOrdenamiento: { label: string; value: string }[] = [
    { label: 'Nombre A-Z', value: 'name-asc' },
    { label: 'Nombre Z-A', value: 'name-desc' }
  ];

  opcionesDeGenero: { label: string; value: string }[] = [];
  opcionesDePlataforma: { label: string; value: string }[] = [];
  generoSeleccionado: string = '';
  plataformaSeleccionada: string = '';
  ordenamientoSeleccionado: string = '';



  
  ngOnInit(): void {
    this.cargarPlataformas();
    this.cargarGeneros();
	  this.cargarJuegos();
  }

    cargarPlataformas(){
    this.plataformaService.obtenerPlataformas().subscribe({
      next : (data) => {
        this.plataformas = data;
      },
      error : (data) => {
        console.log("ERROR AL TRAER LAS PLATAFORMAS PARA FILTRO")
      },
      complete : () =>{
        console.log("PLATAFORMAS TRAIDAS EN CATALOGO PARA FILTRO")
      }
    })
  }

  
  cargarGeneros(){
    this.generoService.obtenerGeneros().subscribe({
      next : (data) => {
        this.generos = data;
      },
      error : (data) => {
        console.log("ERROR AL TRAER LOS GENEROS PARA FILTRO")
      },
      complete : () =>{
        console.log("GENEROS TRAIDOS EN CATALOGO PARA FILTRO")
      }
    })
  }


  cargarJuegos(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.juegoService.getJuegos().subscribe({
      next: (data) => {
        console.log('Juegos cargados:', data.length);
        this.juegos = data;
        this.juegosFiltrados = data;
        this.loading = false;

        this.extraerOpcionesDeFiltrado()

        this.filtrosSeleccionados = this.juegoService.obtenerOpcionesDeFiltradoEnSesion();
        const tieneFiltrosActivos = this.filtrosSeleccionados.some(opt => opt.value !== '');

        if (tieneFiltrosActivos) {
          this.nombreBuscado = this.filtrosSeleccionados.find(o => o.name === "nombreSeleccionado")?.value || '';
          this.generoSeleccionado = this.filtrosSeleccionados.find(o => o.name === "generoSeleccionado")?.value || '';
          this.plataformaSeleccionada = this.filtrosSeleccionados.find(o => o.name === "plataformaSeleccionada")?.value || '';
          this.ordenamientoSeleccionado = this.filtrosSeleccionados.find(o => o.name === "ordenamientoSeleccionado")?.value || '';
          this.aplicarFiltros();
        }
      },
      error: (error) => {
        console.error('Error al cargar juegos:', error);
        this.errorMessage = 'Error al cargar el catálogo de juegos. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

    private extraerOpcionesDeFiltrado(): void {
    
    const genresSet = new Set<string>();
    this.generos.forEach(g => {
      if (g.nombre) {
        genresSet.add(g.nombre);
      }
    });
    this.generosDisponibles = Array.from(genresSet).sort();
    this.opcionesDeGenero = this.generosDisponibles.map(genre => ({
      label: genre,
      value: genre
    }));

    const platformsSet = new Set<string>();
    this.plataformas.forEach(g=> {
      if(g.nombre){
        platformsSet.add(g.nombre);
      }
    })
    this.plataformasDisponibles = Array.from(platformsSet).sort();
    this.opcionesDePlataforma = this.plataformasDisponibles.map(platform => ({
      label: platform,
      value: platform
    }));
    
  }


  
  private aplicarFiltros(): void {

    
    let result = [...this.juegos];

    if (this.nombreBuscado.trim()) {
      const term = this.nombreBuscado.toLowerCase();
      this.juegoService.guardarBusquedaEnSesion(term);
      result = result.filter(juego =>
        juego.nombre ? juego.nombre.toLowerCase().includes(term) : false
      );
    }

    if (this.generoSeleccionado) {
      console.log("LO QUE SELECCIONE DE GENERO: ",this.generoSeleccionado)
		this.juegoService.guardarGeneroEnSesion(this.generoSeleccionado);
      result = result.filter(juego => Array.isArray(juego.genero) &&
        juego?.genero.some(g => g.nombre?.toLocaleLowerCase() == this.generoSeleccionado.toLocaleLowerCase())
      );
    }
    
    if (this.plataformaSeleccionada) {
		this.juegoService.guardarPlataformaEnSesion(this.plataformaSeleccionada);
      result = result.filter(juego => Array.isArray(juego.plataforma) &&
        juego.plataforma.some(p => p.nombre?.toLocaleLowerCase() == this.plataformaSeleccionada.toLocaleLowerCase()));
    }
    
    if (this.ordenamientoSeleccionado) {
		this.juegoService.guardarOrdenamientoEnSesion(this.ordenamientoSeleccionado);
      result = this.ordenarPorNombre(result, this.ordenamientoSeleccionado);
    }

    this.juegosFiltrados = result;

    console.log(`Filtros aplicados: ${result.length} de ${this.juegos.length} juegos`);
    
  }

    private ordenarPorNombre(juegos: JuegoPlataformaGenero[], sortType: string): JuegoPlataformaGenero[] {
    const sorted = [...juegos];
    
    switch (sortType) {
      case 'name-asc':
        return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
      
      case 'name-desc':
        return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
      
      default:
        return sorted;
    }
  }



  //TODO:FUNCIONES PARA EVENTOS

  handleSearch(nombreBuscado: string): void {
    this.nombreBuscado = nombreBuscado;
    this.aplicarFiltros();
  }


  handleFilterChange(filtros: GameFilter): void {
    this.filtros = filtros;
    this.ordenamientoSeleccionado = filtros.ordenamiento;
    this.generoSeleccionado = filtros.genero;
    this.plataformaSeleccionada = filtros.plataforma;

    this.aplicarFiltros();
  }

  borrarFiltros(): void {
	this.juegoService.clearFilters();
    this.nombreBuscado = '';
    this.generoSeleccionado = '';
    this.plataformaSeleccionada = '';
    this.ordenamientoSeleccionado = '';
    this.filtros = {
      ordenamiento: '',
      genero: '',
      plataforma: ''
    };
    this.aplicarFiltros();
  }

  //PARA EL HIJO
  getActiveFiltersCount(): number {
    let count = 0;
    if (this.generoSeleccionado) count++;
    if (this.plataformaSeleccionada) count++;
    if (this.ordenamientoSeleccionado) count++;
    if (this.nombreBuscado.trim()) count++;
    return count;
  }


  tieneFiltrosActivos(): boolean {
    return this.getActiveFiltersCount() > 0;
  }

  reloadCatalog(): void {
    this.borrarFiltros();
    this.cargarJuegos();
  }


  getEmptyMessage(): string {
    if (this.tieneFiltrosActivos()) {
      return 'No se encontraron juegos con los filtros aplicados';
    }
    return 'No se encontraron juegos';
  }


  //TODO:PARA NAVEGAR ENTRE PAGINAS

  navigateToWishlist(): void {
  this.router.navigate(['/wishlist']);
  }


  verDetalle(juego: Juego): void {
    this.router.navigate(['/juego', juego.id]);
  }


  navigateToProfile(): void {
    this.router.navigate(['/usuario-perfil']);
  }

}
