import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Juego } from '@interfaces/juego.interface';
import { environment } from '@evironment/environment';

/**
 * Componente presentacional para mostrar una tarjeta individual de juego en la biblioteca
 * Es completamente "tonto" - solo recibe datos y emite eventos
 */
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  /**
   * Datos del juego a mostrar
   */
  @Input() juego!: Juego;

  /**
   * URL de imagen placeholder si no hay imagen
   */
  @Input() placeholderImage: string = 'assets/placeholder.png';

  /**
   * Bandera para manejar errores de carga de imagen
   */
  imageError: boolean = false;

  /**
   * Evento emitido cuando se hace click en la card
   */
  @Output() onClick = new EventEmitter<void>();

  /**
   * Maneja el click en la card completa
   */
  handleCardClick(event: Event): void {
    // Evita que el click en botones dispare el evento de la card
    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      this.onClick.emit();
    }
  }

  /**
   * Obtiene la URL de la imagen del juego
   */
  getImageUrl(): string {
    // Prioridad 1: Usar mainImagen.url si existe (desde el backend)
    if (this.juego.mainImagen?.url) {
      return this.juego.mainImagen.url;
    }
    
    // Prioridad 2: Construir URL con mainImagenId (fallback)
    if (this.juego.mainImagenId) {
      return `${environment.BACKEND_URL}/imagenes/${this.juego.mainImagenId}`;
    }
    
    // Prioridad 3: Imagen placeholder
    return this.placeholderImage;
  }

  /**
   * Maneja el error de carga de imagen
   */
  onImageError(event: Event): void {
    this.imageError = true;
    console.warn(`⚠️ Error cargando imagen para ${this.juego.nombre}`);
  }

  /**
   * Obtiene una descripción corta del juego (máximo 100 caracteres)
   */
  getShortDescription(): string {
    if (!this.juego.descripcion) return '';
    const maxLength = 100;
    if (this.juego.descripcion.length <= maxLength) {
      return this.juego.descripcion;
    }
    return this.juego.descripcion.substring(0, maxLength) + '...';
  }
}
