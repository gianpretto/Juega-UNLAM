import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Juego } from '@interfaces/juego.interface';
import { CardVM } from '../../../../servicios/juego.service';

/**
 * Componente presentacional para mostrar una tarjeta individual de juego
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
  @Input() juego!: CardVM | any;

  /**
   * Indica si el juego está en la biblioteca del usuario
   */
  @Input() isInBiblio: boolean = false;

  /**
   * Indica si el juego está marcado como favorito
   */
  @Input() isFavorite: boolean = false;

  /**
   * URL de imagen placeholder si no hay imagen
   */
  @Input() placeholderImage: string = 'assets/placeholder.png';

  /**
   * Evento emitido cuando se hace click en la card
   */
  @Output() onClick = new EventEmitter<void>();

  /**
   * Evento emitido cuando se agrega a la biblioteca
   */
  @Output() onAddToBiblio = new EventEmitter<void>();

  /**
   * Evento emitido cuando se marca/desmarca como favorito
   */
  @Output() onToggleFavorite = new EventEmitter<void>();

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
   * Maneja el click en el botón de agregar a biblioteca
   */
  handleAddToBiblio(event: Event): void {
    event.stopPropagation();
    this.onAddToBiblio.emit();
  }

  /**
   * Maneja el click en el botón de favoritos
   */
  handleToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.onToggleFavorite.emit();
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
   * Obtiene los nombres de géneros concatenados
   */
  /*
  TODO:HAY QUE CAMBIAR ESTO PARA QUE OBTENGA DEL SERVICIO LOS GENEROS DE LOS JUEGOS
  */
  /*
  getGenreNames(): string {
    return this.juego.genres?.map(g => g.name).slice(0, 3).join(', ') || 'Sin género';
  }


  getGameImage(): string {
    return this.juego.background_image || this.placeholderImage;
  }


  hasPlatforms(): boolean {
    return !!(this.juego.parent_platforms && this.juego.parent_platforms.length > 0);
  }


  hasGenres(): boolean {
    return !!(this.juego.genres && this.juego.genres.length > 0);
  }


  getLimitedPlatforms() {
    return this.juego.parent_platforms?.slice(0, 4) || [];
  }


  getLimitedGenres() {
    return this.juego.genres?.slice(0, 3) || [];
  }


  getFormattedDate(): string {
    if (!this.juego.released) return 'Sin fecha';

    const date = new Date(this.juego.released);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }*/


}
