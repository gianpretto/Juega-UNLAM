import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

/**
 * PRESENTATIONAL COMPONENT - Barra de búsqueda de juegos
 *
 * RESPONSABILIDADES:
 * - Renderizar input de búsqueda
 * - Emitir eventos cuando el usuario escribe
 * - Mostrar icono de búsqueda
 * - Limpiar búsqueda con botón X
 *
 * NO hace:
 * - Filtrar datos
 * - Llamar servicios
 * - Gestionar estado global
 */
@Component({
  selector: 'app-game-search',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent {

  // ========================================
  // INPUTS - Configuración desde el padre
  // ========================================

  /** Placeholder del input de búsqueda */
  @Input() placeholder: string = 'Buscar en tu biblioteca...';

  /** Deshabilita el input de búsqueda */
  @Input() disabled: boolean = false;

  /** Valor inicial de búsqueda (para resetear desde el padre) */
  @Input()
  set initialValue(value: string) {
    this.searchTerm = value;
  }

  // ========================================
  // OUTPUTS - Eventos hacia el padre
  // ========================================

  /** Emite el término de búsqueda cuando cambia */
  @Output() onSearch = new EventEmitter<string>();

  /** Emite cuando se limpia la búsqueda */
  @Output() onClear = new EventEmitter<void>();

  // ========================================
  // PROPIEDADES LOCALES
  // ========================================

  /** Término de búsqueda actual */
  searchTerm: string = '';

  // ========================================
  // MÉTODOS PÚBLICOS
  // ========================================

  /**
   * Maneja el evento input del campo de búsqueda
   * Emite el término de búsqueda al componente padre
   */
  handleSearchInput(): void {
    this.onSearch.emit(this.searchTerm);
  }

  /**
   * Limpia el campo de búsqueda
   * Emite eventos de limpieza y búsqueda vacía
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.onClear.emit();
    this.onSearch.emit('');
  }

  /**
   * Verifica si hay texto en la búsqueda
   * @returns true si hay texto
   */
  hasSearchTerm(): boolean {
    return this.searchTerm.trim().length > 0;
  }
}
