import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor,DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

import { JuegoService } from '../../servicios/juego.service';
import { GameCardComponent } from '../../modules/biblioteca/components/game-card/game-card.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CarouselModule, ButtonModule, GameCardComponent,DecimalPipe],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {
  private js = inject(JuegoService);

  heroSlides: Array<{ img: string; title: string; subtitle: string; cta: { text: string; link: string } }> = [];
  ofertas: CardVM[] = [];
  destacados: CardVM[] = [];
  populares: CardVM[] = [];

  heroMosaic: any = null;
  mosaicText: any = null;
  mosaicBanner: any = null;


  loading = false;
  error?: string;

  // breakpoints carrusel
  resp = [
    { breakpoint: '1400px', numVisible: 4, numScroll: 4 },
    { breakpoint: '1200px', numVisible: 3, numScroll: 3 },
    { breakpoint: '960px',  numVisible: 2, numScroll: 2 },
    { breakpoint: '640px',  numVisible: 1, numScroll: 1 }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.error = undefined;

    /** CORRE EN PARALELO: ofertas + catálogo */
    forkJoin({
      ofertas: this.js.getOfertas(8),
      catalogo: this.js.getCatalogo({ limit: 16, sort: 'fechaLanzamiento:desc' })
    }).subscribe({
      next: ({ ofertas, catalogo }) => {
        console.log("HOME OFERTAS >>>", ofertas);
        console.log("HOME CATALOGO >>>", catalogo);

        // Mapeo general
        this.ofertas = ofertas.map(o => ({
          id: o.id,
          nombre: o.nombre,
          precio: o.precio,
          imagen: o.coverUrl ?? o.imagen ?? '',
          descuento: o.discount ?? o.descuento ?? 0,
          finalPrice: o.finalPrice ?? o.precio
        }));

        this.destacados = catalogo.slice(0, 6).map(j => ({
          id: j.id,
          nombre: j.nombre,
          precio: j.precio,
          imagen: j.coverUrl ?? j.imagen ?? '',
        }));

        this.populares = catalogo.slice(6, 12).map(j => ({
          id: j.id,
          nombre: j.nombre,
          precio: j.precio,
          imagen: j.coverUrl ?? j.imagen ?? '',
        }));

        /** HERO IMAGES: primeras 3 con imagen válida */
        const heroBase = [...this.ofertas, ...catalogo]
          .filter(g => g.imagen)
          .slice(0, 3);

        this.heroSlides = heroBase.map(g => ({
          img: g.imagen,
          title: g.nombre,
          subtitle: 'Explorá el catálogo',
          cta: { text: 'Explorar catálogo', link: '/catalogo' }
        }));

              this.js.getOfertas(8).subscribe({
          next: (ofertas) => {
            this.ofertas = ofertas.map(o => ({
              id: o.id,
              nombre: o.nombre,
              precio: o.precio,
              imagen: o.coverUrl ?? o.imagen ?? '',
              descuento: o.discount ?? o.descuento ?? 0,
              finalPrice: o.finalPrice ?? o.precio
            }));

            // === MOSAICO ===
            this.heroMosaic   = this.ofertas[0] ?? null;
            this.mosaicText   = this.ofertas[1] ?? null;
            this.mosaicBanner = this.ofertas[2] ?? null;
          },
          error: err => console.error('Error cargando ofertas', err)
        });

        this.js.getJuegos().subscribe({
          next: (juegos) => {
            this.destacados = juegos.slice(0, 6).map(j => ({
              id: j.id,
              nombre: j.nombre,
              precio: j.precio,
              imagen: j.coverUrl ?? j.imagen ?? '',
            }));
          }
        });

        this.loading = false;
      },

      error: (err) => {
        console.error('Error cargando Home:', err);
        this.error = 'No se pudo cargar el Home';
        this.loading = false;
      }
    });
  }
}
