import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameFilter } from '../../interfaces/game-filter.interface';
import { FilterOption } from '../../interfaces/filter-options.interface';

/**
 * Componente presentacional para los filtros de juegos
 * Emite eventos al componente padre cuando cambian los filtros
 * NOTA: Usa <select> nativos en lugar de PrimeNG Dropdown
 */
@Component({
  selector: 'app-game-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-filters.component.html',
  styleUrl: './game-filters.component.css'
})
export class GameFiltersComponent implements OnChanges {
  /**
   * Filtros actuales recibidos del componente padre
   */
  @Input() filters: GameFilter = {
    sortBy: '',
    genero: '',
    plataforma: ''
  };

  @Input() selectedOptions: FilterOption[] = [];

  /**
   * También aceptamos 'defaultOptions' desde el padre (selectedOptions)
   * y las mapeamos a los filtros internos para que los <select> muestren
   * el valor recibido al inicializar el componente.
   */
  ngOnChanges(changes: SimpleChanges): void {
  if (changes['selectedOptions'] && Array.isArray(this.selectedOptions)) {
    const sortOpt = this.selectedOptions.find(o => o.name === 'sort');
    const genreOpt = this.selectedOptions.find(o => o.name === 'genre');
    const platformOpt = this.selectedOptions.find(o => o.name === 'platform');

    this.filters.sortBy = sortOpt?.value || '';
    this.filters.genero = genreOpt?.value || '';
    this.filters.plataforma = platformOpt?.value || '';
  }
}


  /**
   * Opciones disponibles para el dropdown de ordenamiento
   */
  @Input() sortOptions: { label: string; value: string }[] = [];

  /**
   * Opciones disponibles para el dropdown de géneros
   */
  @Input() genreOptions: { label: string; value: string }[] = [];

  /**
   * Opciones disponibles para el dropdown de plataformas
   */
  @Input() platformOptions: { label: string; value: string }[] = [];

  /**
   * Indica si los filtros están deshabilitados (ej: mientras se cargan datos)
   */
  @Input() disabled: boolean = false;

  /**
   * Evento emitido cuando cambia cualquier filtro
   */
  @Output() onFilterChange = new EventEmitter<GameFilter>();

  /**
   * Evento emitido cuando se limpian todos los filtros
   */
  @Output() onClearFilters = new EventEmitter<void>();

  /**
   * Maneja el cambio en el filtro de ordenamiento
   */
  onSortChange(value: string): void {
    this.filters.sortBy = value;
    this.emitFilterChange();
  }

  /**
   * Maneja el cambio en el filtro de género
   */
  onGenreChange(value: string): void {
    this.filters.genero = value;
    this.emitFilterChange();
  }

  /**
   * Maneja el cambio en el filtro de plataforma
   */
  onPlatformChange(value: string): void {
    this.filters.plataforma = value;
    this.emitFilterChange();
  }

  /**
   * Emite el evento de cambio de filtros
   */
  private emitFilterChange(): void {
    this.onFilterChange.emit({ ...this.filters });
  }

  /**
   * Limpia todos los filtros
   */
  clearAllFilters(): void {
    this.filters = {
      sortBy: '',
      genero: '',
      plataforma: ''
    };
    this.onClearFilters.emit();
  }

  /**
   * Verifica si hay algún filtro activo
   */
  hasActiveFilters(): boolean {
    return !!(this.filters.sortBy || this.filters.genero || this.filters.plataforma);
  }

  /**
   * Cuenta cuántos filtros están activos
   */
  getActiveFiltersCount(): number {
    let count = 0;
    if (this.filters.sortBy) count++;
    if (this.filters.genero) count++;
    if (this.filters.plataforma) count++;
    return count;
  }
}
