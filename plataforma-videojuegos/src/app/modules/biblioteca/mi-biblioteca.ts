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
    GameGridComponent
  ],
  templateUrl: './mi-biblioteca.html',
  styleUrls: ['./mi-biblioteca.css']
})
export class MiBibliotecaComponent implements OnInit {

  juegos: Juego[] = [];
  filteredJuegos: Juego[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';

  private bibliotecaService = inject(BibliotecaService);
 
  ngOnInit(): void {
    this.cargarBiblioteca();
  }

  cargarBiblioteca(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bibliotecaService.obtenerJuegos().subscribe({
      next: (data) => {
        this.juegos = data;
        this.filteredJuegos = data;
        this.loading = false;

      },
      error: (error) => {
        this.errorMessage = 'Error al cargar tu biblioteca. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  
  handleSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  handleGameClick(juego: Juego): void {
   
  }

  private applyFilters(): void {
    let result = [...this.juegos];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(juego =>
        juego.nombre.toLowerCase().includes(term)
      );
    }

    this.filteredJuegos = result;
 }

  reloadBiblioteca(): void {
    this.clearFilters();
    this.cargarBiblioteca();
  }
  hasActiveFilters(): boolean {
    return !!this.searchTerm.trim();
  }

  getEmptyMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No se encontraron juegos con los filtros aplicados';
    }
    return 'Tu biblioteca está vacía. ¡Explora el catálogo y agrega juegos!';
  }
}
