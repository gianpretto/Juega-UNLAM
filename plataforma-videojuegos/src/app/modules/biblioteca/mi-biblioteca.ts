import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Juego } from "@interfaces/juego.interface";
import { BibliotecaService } from "@servicios/biblioteca.service";
import { UsuarioService } from "@servicios/usuario.service";

import { GameSearchComponent } from "@modules/catalogo-juegos/components/game-search/game-search.component";
import { GameGridComponent } from "@modules/catalogo-juegos/components/game-grid/game-grid.component";



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


  currentUserId: number | null = null;

  juegos: Juego[] = [];

  filteredJuegos: Juego[] = [];

  loading: boolean = true;

  errorMessage: string = '';

  searchTerm: string = '';


  private bibliotecaService = inject(BibliotecaService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  ngOnInit(): void {
    console.log("📚 Mi Biblioteca inicializada");
    
    this.currentUserId = this.usuarioService.obtenerUsuarioDeSesion();
    
    if (this.currentUserId) {
      this.cargarBiblioteca();
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver tu biblioteca';
      this.loading = false;
      
      setTimeout(() => {
        this.router.navigate(['/iniciar-sesion']);
      }, 2000);
    }
  }

  cargarBiblioteca(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bibliotecaService.obtenerJuegos().subscribe({
      next: (data) => {
        this.juegos = data;
        this.filteredJuegos = data;
        this.loading = false;

        this.extractFilterOptions();
      },
      error: (error) => {
        
        if (error.message.includes('iniciar sesión')) {
          this.errorMessage = error.message;
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


  private extractFilterOptions(): void {
    console.log('⚠️ Extracción de filtros pendiente de implementación');
  }


 
  handleSearch(searchTerm: string): void {
    console.log('🔍 Búsqueda en biblioteca:', searchTerm);
    this.searchTerm = searchTerm;
    this.applyFilters();
  }


  handleGameClick(juego: Juego): void {
    console.log('👁️ Ver detalles de:', juego.nombre);
    this.router.navigate(['/juego', juego.id]);
  }

 
  handleRemoveFromBiblio(juego: Juego): void {
    console.log('🗑️ Eliminar de biblioteca:', juego.nombre);

    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar "${juego.nombre}" de tu biblioteca?`);

    if (confirmDelete) {
      this.bibliotecaService.eliminarJuego(juego.id).subscribe({
        next: () => {
          this.juegos = this.juegos.filter(j => j.id !== juego.id);
          this.applyFilters();
        },
        error: (error) => {
          alert('Error al eliminar el juego. Por favor, intenta de nuevo.');
        }
      });
    }
  }


  getEmptyMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No se encontraron juegos con los filtros aplicados';
    }
    return 'Tu biblioteca está vacía. ¡Explora el catálogo y agrega juegos!';
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

    console.log(`📋 Búsqueda aplicada en biblioteca: ${result.length} de ${this.juegos.length} juegos`);
  }


  hasActiveFilters(): boolean {
    return !!this.searchTerm.trim();
  }

  
  getStats() {
    return {
      total: this.juegos.length
    };
  }

 
  reloadBiblioteca(): void {
    this.searchTerm = '';
    this.cargarBiblioteca();
  }
}
