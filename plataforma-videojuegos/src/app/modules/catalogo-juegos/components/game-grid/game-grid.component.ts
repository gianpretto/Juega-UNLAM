import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Juego } from '@interfaces/juego.interface';
import { GameCardComponent } from '@modules/catalogo-juegos/components/game-card/game-card.component';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css'
})
export class GameGridComponent {

  @Input() juegos: Juego[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No se encontraron juegos';
  @Output() onGameClick = new EventEmitter<Juego>();


  handleGameClick(juego: Juego): void {
    this.onGameClick.emit(juego);
  }


  hasJuegos(): boolean {
    return this.juegos && this.juegos.length > 0;
  }
  
  getJuegosCount(): number {
    return this.juegos ? this.juegos.length : 0;
  }

  trackByJuegoId(index: number, juego: Juego): number {
    return juego.id;
  }
}
