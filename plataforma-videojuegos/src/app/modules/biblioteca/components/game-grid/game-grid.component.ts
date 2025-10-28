import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Juego } from '../../../../shared/models/juego.model';
import { GameCardComponent } from '../game-card/game-card.component';

/**
 * Componente presentacional para mostrar una grilla de juegos
 * Recibe la lista de juegos y la organiza en un layout responsivo
 */
@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css'
})
export class GameGridComponent {
  /**
   * Lista de juegos a mostrar en la grilla
   */
  @Input() juegos: Juego[] = [];

  /**
   * Indica si los juegos se están cargando
   */
  @Input() loading: boolean = false;

  /**
   * Mensaje personalizado cuando no hay juegos
   */
  @Input() emptyMessage: string = 'No se encontraron juegos';

  /**
   * Evento emitido cuando se hace click en un juego
   */
  @Output() onGameClick = new EventEmitter<Juego>();

  /**
   * Evento emitido cuando se agrega un juego a la biblioteca
   */
  @Output() onAddToBiblio = new EventEmitter<Juego>();

  /**
   * Evento emitido cuando se marca un juego como favorito
   */
  @Output() onToggleFavorite = new EventEmitter<Juego>();

  /**
   * Maneja el click en un juego
   */
  handleGameClick(juego: Juego): void {
    this.onGameClick.emit(juego);
  }

  /**
   * Maneja la acción de agregar a biblioteca
   */
  handleAddToBiblio(juego: Juego): void {
    this.onAddToBiblio.emit(juego);
  }

  /**
   * Maneja la acción de marcar como favorito
   */
  handleToggleFavorite(juego: Juego): void {
    this.onToggleFavorite.emit(juego);
  }

  /**
   * Verifica si hay juegos para mostrar
   */
  hasJuegos(): boolean {
    return this.juegos && this.juegos.length > 0;
  }

  /**
   * Obtiene el número total de juegos
   */
  getJuegosCount(): number {
    return this.juegos ? this.juegos.length : 0;
  }

  /**
   * Función trackBy para optimizar el renderizado de la lista
   */
  trackByJuegoId(index: number, juego: Juego): number {
    return juego.id;
  }
}
