import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Juego } from '@interfaces/juego.interface';
import { environment } from '@evironment/environment';


@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {

  @Input() juego!: Juego;

  @Input() placeholderImage: string = 'assets/placeholder.png';

  imageError: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleCardClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      this.onClick.emit();
    }
  }

  
  getImageUrl(): string {
    if (this.juego.mainImagen?.url) {
      return this.juego.mainImagen.url;
    }
    
    if (this.juego.mainImagenId) {
      return `${environment.BACKEND_URL}/imagenes/${this.juego.mainImagenId}`;
    }
    
    return this.placeholderImage;
  }


  onImageError(event: Event): void {
    this.imageError = true;
  }

  getShortDescription(): string {
    if (!this.juego.descripcion) return '';
    const maxLength = 100;
    if (this.juego.descripcion.length <= maxLength) {
      return this.juego.descripcion;
    }
    return this.juego.descripcion.substring(0, maxLength) + '...';
  }
}
