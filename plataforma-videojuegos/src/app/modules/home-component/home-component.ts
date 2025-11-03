import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

import { JuegoService } from '../../core/services/juego.service';
// Ajustá esta ruta a donde está tu card real:
import { GameCardComponent } from '../../modules/biblioteca/components/game-card/game-card.component';

type CardVM = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;     // primera imagen para la card
  imagenes?: string[]; // para detalle si tu card lo usa
  descuento?: number; // opcional para Ofertas
  rating?: number;    // opcional para Populares
  tags?: string[];    // opcional
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CarouselModule, ButtonModule, GameCardComponent],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent {
  private js = inject(JuegoService);

  // Base: Silksong hardcodeado desde el service
  private base = this.js.getJuegoById(1);

  // HERO: usa las imágenes del juego
  heroSlides = this.base.imagenes.map(src => ({
    img: src,
    title: this.base.nombre,
    subtitle: 'Explorá el reino de seda y canto',
    cta: { text: 'Explorar catálogo', link: '/catalogo' }
  }));

  // Map a ViewModel simple para la card
  private toCard = (extra: Partial<CardVM> = {}): CardVM => ({
    id: this.base.id,
    nombre: this.base.nombre,
    precio: this.base.precio,
    imagen: this.base.imagenes[0],
    imagenes: this.base.imagenes,
    ...extra
  });

  // Carruseles (mock front)
  ofertas: CardVM[] = [
    this.toCard({ descuento: 30 }),
    this.toCard({ descuento: 20 }),
    this.toCard({ descuento: 15 }),
    this.toCard({ descuento: 40 })
  ];

  destacados: CardVM[] = [
    this.toCard(),
    this.toCard(),
    this.toCard(),
    this.toCard()
  ];

  populares: CardVM[] = [
    this.toCard({ rating: 9.2 }),
    this.toCard({ rating: 8.9 }),
    this.toCard({ rating: 8.6 }),
    this.toCard({ rating: 8.3 })
  ];

  // Breakpoints del carrusel
  resp = [
    { breakpoint: '1400px', numVisible: 4, numScroll: 4 },
    { breakpoint: '1200px', numVisible: 3, numScroll: 3 },
    { breakpoint: '960px',  numVisible: 2, numScroll: 2 },
    { breakpoint: '640px',  numVisible: 1, numScroll: 1 }
  ];
}
