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

  @Input() isInBiblio: boolean = false;

  @Input() isFavorite: boolean = false;

  @Input() placeholderImage: string = 'assets/placeholder.png';

  /**
   * Bandera para manejar errores de carga de imagen
   */
  imageError: boolean = false;

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
   * Obtiene el icono correspondiente a una plataforma
   */
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

  /**
   * Obtiene la fecha formateada del lanzamiento
   */
  getFormattedDate(): string {
    if (!this.juego.released) return 'Sin fecha';

    const date = new Date(this.juego.released);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

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
    console.warn(`Error cargando imagen para ${this.juego.nombre}`);
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
