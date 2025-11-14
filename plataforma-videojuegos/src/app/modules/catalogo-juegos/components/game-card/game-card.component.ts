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

 
  imageError: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  @Output() onAddToBiblio = new EventEmitter<void>();

  
  @Output() onToggleFavorite = new EventEmitter<void>();


  handleCardClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      this.onClick.emit();
    }
  }

 
  handleAddToBiblio(event: Event): void {
    event.stopPropagation();
    this.onAddToBiblio.emit();
  }


  handleToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.onToggleFavorite.emit();
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

    for (const [key, icon] of Object.entries(platformIcons)) {
      if (platformName.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }

    return 'pi pi-desktop';
  }

 
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
    console.warn(`Error cargando imagen para ${this.juego.nombre}`);
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
