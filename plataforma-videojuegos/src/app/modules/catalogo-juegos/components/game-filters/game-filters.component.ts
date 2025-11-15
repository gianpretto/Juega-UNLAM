import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameFilter } from '@interfaces/game-filter.interface';
import { FilterOption } from '@interfaces/filter-options.interface';

@Component({
  selector: 'app-game-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-filters.component.html',
  styleUrl: './game-filters.component.css'
})
export class GameFiltersComponent implements OnChanges {
  @Input() filters: GameFilter = {
    ordenamiento: '',
    genero: '',
    plataforma: ''
  };

  @Input() selectedOptions: FilterOption[] = [];


  ngOnChanges(changes: SimpleChanges): void {
  if (changes['selectedOptions'] && Array.isArray(this.selectedOptions)) {
    const sortOpt = this.selectedOptions.find(o => o.name === 'ordenamientoSeleccionado');
    const genreOpt = this.selectedOptions.find(o => o.name === 'generoSeleccionado');
    const platformOpt = this.selectedOptions.find(o => o.name === 'plataformaSeleccionada');

    this.filters.ordenamiento = sortOpt?.value || '';
    this.filters.genero = genreOpt?.value || '';
    this.filters.plataforma = platformOpt?.value || '';
  }
}

  @Input() sortOptions: { label: string; value: string }[] = [];

  @Input() genreOptions: { label: string; value: string }[] = [];

  @Input() platformOptions: { label: string; value: string }[] = [];

  @Input() disabled: boolean = false;


  @Output() onFilterChange = new EventEmitter<GameFilter>();

  @Output() onClearFilters = new EventEmitter<void>();

  onSortChange(value: string): void {
    this.filters.ordenamiento = value;
    this.emitFilterChange();
  }

  onGenreChange(value: string): void {
    this.filters.genero = value;
    this.emitFilterChange();
  }

  onPlatformChange(value: string): void {
    this.filters.plataforma = value;
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.onFilterChange.emit({ ...this.filters });
  }

  clearAllFilters(): void {
    this.filters = {
      ordenamiento: '',
      genero: '',
      plataforma: ''
    };
    this.onClearFilters.emit();
  }

  hasActiveFilters(): boolean {
    return !!(this.filters.ordenamiento || this.filters.genero || this.filters.plataforma);
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.filters.ordenamiento) count++;
    if (this.filters.genero) count++;
    if (this.filters.plataforma) count++;
    return count;
  }
}
