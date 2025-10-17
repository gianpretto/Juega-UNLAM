import { Component, OnInit } from "@angular/core";
import {Juego} from "../../interfaces/juego.interface";
import { inject } from "@angular/core";
import { JuegoService } from "../../../../api/api-rawg/juego/juego.service";
import {TableModule} from "primeng/table";
import { CommonModule } from "@angular/common";
import { TagModule } from "primeng/tag";
import { Button, ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: "app-list-juegos",
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    TooltipModule
],
  templateUrl: "./list-juegos.html",
  styleUrls: ["./list-juegos.css"]
})
export class ListJuegosComponent implements OnInit {
  juegos: Juego[] = [];
  filteredJuegos: Juego[] = [];
  loading: boolean = true;

  private juegoService = inject(JuegoService);

  ngOnInit(): void {
    console.log("Componente ListJuegosComponent inicializado");
    this.listJuegos();
  }

  listJuegos(): void {
  this.loading = true;
  this.juegoService.getJuegos().subscribe({
    next: (data) => {
      console.log('🔍 Datos recibidos del servicio:', data);
      console.log('🔍 ¿Es un array?', Array.isArray(data));
      console.log('🔍 Cantidad de juegos:', data?.length);
      console.log('🔍 Primer juego completo:', data[0]);
      console.log('🔍 Parent platforms del primer juego:', data[0]?.parent_platforms);

      this.juegos = data;
      this.filteredJuegos = data; // ✅ IMPORTANTE: Asigna también a filteredJuegos
      this.loading = false;

      console.log('✅ this.juegos:', this.juegos);
      console.log('✅ this.filteredJuegos:', this.filteredJuegos);
    },
    error: (error) => {
      console.error('❌ Error al obtener los juegos:', error);
      this.loading = false;
    }
  });
}

  filterGames(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredJuegos = this.juegos;
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredJuegos = this.juegos.filter(juego =>
      juego.name.toLowerCase().includes(term)
    );
  }

getPlatformIcon(platformName: string): string {
    const platformIcons: { [key: string]: string } = {
      'PC': 'pi pi-desktop',
      'PlayStation': 'pi pi-circle',
      'Xbox': 'pi pi-times',
      'Nintendo': 'pi pi-star',
      'iOS': 'pi pi-mobile',
      'Android': 'pi pi-android',
      'Linux': 'pi pi-code',
      'macOS': 'pi pi-apple'
    };

    // Buscar coincidencia parcial
    for (const [key, icon] of Object.entries(platformIcons)) {
      if (platformName.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }

    return 'pi pi-desktop'; // Icono por defecto
  }
  getPlatformNames(juego: Juego): string {
    return juego.parent_platforms?.map(p => p.platform.name).join(', ') || 'N/A';
  }

  getGenreNames(juego: Juego): string {
    return juego.genres?.map(g => g.name).slice(0, 3).join(', ') || 'N/A';
  }

}
