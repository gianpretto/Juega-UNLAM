import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

import { JuegoService } from '../../servicios/juego.service';
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
export class HomeComponent implements OnInit {
  private js = inject(JuegoService);

  // base game cargado desde el servicio (async)
  private base: any = null;

  // HERO / carruseles inicializados vacíos para evitar errores en template
  heroSlides: Array<any> = [];
  ofertas: CardVM[] = [];
  destacados: CardVM[] = [];
  populares: CardVM[] = [];

  // Map a ViewModel simple para la card (usa valores por defecto si no hay base)
  private toCard = (extra: Partial<CardVM> = {}): CardVM => ({
    id: this.base?.id ?? 0,
    nombre: this.base?.name ?? this.base?.title ?? 'Sin nombre',
    precio: this.base?.price ?? 0,
    imagen: (this.base?.short_screenshots?.[0]?.image ?? this.base?.background_image) ?? '',
    imagenes: this.base?.short_screenshots?.map((s: any) => s.image) ?? (this.base?.imagenes ?? []),
    ...extra
  });

  // Breakpoints del carrusel
  resp = [
    { breakpoint: '1400px', numVisible: 4, numScroll: 4 },
    { breakpoint: '1200px', numVisible: 3, numScroll: 3 },
    { breakpoint: '960px',  numVisible: 2, numScroll: 2 },
    { breakpoint: '640px',  numVisible: 1, numScroll: 1 }
  ];

  ngOnInit(): void {
    // cargar el juego de ejemplo (id 1)
    this.js.getJuegoById(1).subscribe({
      next: (game) => {
        this.base = game || {};
        this.buildHeroAndCarousels();
      },
      error: (err) => {
        console.error('Error cargando juego base para home:', err);
        // fallback: dejar carruseles vacíos o con mock mínimo
      }
    });
  }

  private buildHeroAndCarousels(): void {
    const images = this.base?.short_screenshots?.map((s: any) => s.image)
      || (this.base?.imagenes ?? [])
      || (this.base?.background_image ? [this.base.background_image] : []);

    this.heroSlides = (images || []).map((src: string) => ({
      img: src,
      title: this.base?.name ?? this.base?.title ?? 'Sin nombre',
      subtitle: 'Explorá el catálogo',
      cta: { text: 'Explorar catálogo', link: '/catalogo' }
    }));

    // ejemplos basados en la misma base
    this.ofertas = [
      this.toCard({ descuento: 30 }),
      this.toCard({ descuento: 20 }),
      this.toCard({ descuento: 15 }),
      this.toCard({ descuento: 40 })
    ];

    this.destacados = [
      this.toCard(),
      this.toCard(),
      this.toCard(),
      this.toCard()
    ];

    this.populares = [
      this.toCard({ rating: 9.2 }),
      this.toCard({ rating: 8.9 }),
      this.toCard({ rating: 8.6 }),
      this.toCard({ rating: 8.3 })
    ];
  }
}