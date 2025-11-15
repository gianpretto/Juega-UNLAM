import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

import { JuegoService } from '../../servicios/juego.service';
import { GameCardComponent } from '../../modules/biblioteca/components/game-card/game-card.component';
import { JuegoPlataformaGenero } from '@general/interfaces/juego-plafatorma-genero.interface';
import { Genero } from '@general/interfaces/genero.interface';
import { Plataforma } from '@general/interfaces/plataforma.interface';
import { Router } from '@angular/router';

interface HeroSlide {
  img: string;
  title: string;
  subtitle: string;
  badge?: string;
  cta: { text: string; link: string };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, RouterLink,CarouselModule, ButtonModule, GameCardComponent],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {

  private js = inject(JuegoService);
  private router = inject(Router);

  juegos: JuegoPlataformaGenero[] = [];

  mejorCalificados: JuegoPlataformaGenero[] = [];
  rpgFantasia: JuegoPlataformaGenero[] = [];
  porPlataforma: JuegoPlataformaGenero[] = [];
  tripleB: JuegoPlataformaGenero[] = [];


  heroSlides: HeroSlide[] = [];

  loading = false;
  error?: string;

  onVerDetalle(id: number): void {
    this.router.navigate(['/juego', id]);
  }

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

    this.js.getJuegos().subscribe({
      next: (juegos) => {
        this.juegos = juegos ?? [];

        const ordenadosPorRating = [...this.juegos].sort(
          (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
        );

        // 1) Carrusel "Mejor calificados"
        this.mejorCalificados = ordenadosPorRating.slice(0, 10);

        // 2) Carrusel "RPG y fantasía"
        const esRpgFantasia = (g: Genero) => {
          const n = (g.nombre ?? '').toLowerCase();
          return n.includes('rpg') || n.includes('rol') || n.includes('fantas');
        };

        const rpg = this.juegos.filter(j =>
          j.genero?.some(esRpgFantasia)
        );

        this.rpgFantasia = (rpg.length ? rpg : ordenadosPorRating).slice(0, 10);

         // 3) Carrusel "Nintendo también acá"
        const nintendoGames = this.juegos.filter(j =>
          j.plataforma?.some((p: Plataforma) =>
            (p.nombre ?? '').toLowerCase().includes('nintendo')
          )
        );

        const conPlataforma = this.juegos.filter(
          j => j.plataforma && j.plataforma.length > 0
        );
        this.porPlataforma = (
          nintendoGames.length ? nintendoGames :
          conPlataforma.length ? conPlataforma :
          ordenadosPorRating
        ).slice(0, 10);

        // 4) Carrusel "Triple B" – Bueno, Bonito y Barato
        const tripleBList = this.juegos.filter(j => (j.precio ?? 999) <= 20);

        this.tripleB = (tripleBList.length ? tripleBList : ordenadosPorRating)
          .slice(0, 10);


        // 5) HERO dinámico con los 3 mejores
        const topHero = ordenadosPorRating.slice(0, 3);

        this.heroSlides = topHero.map(j => ({
          img: this.getImagen(j),
          title: j.nombre,
          subtitle: this.buildSubtitle(j),
          badge: this.buildBadge(j),
          cta: {
            text: 'Ver detalle',
            link: `/juego/${j.id}`
          }
        }));

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando Home:', err);
        this.error = 'No se pudo cargar el Home';
        this.loading = false;
      }
    });
  }

  private getImagen(j: JuegoPlataformaGenero): string {
    return (j.mainImagen as any)?.url
      ?? j.imagenes
      ?? 'assets/img/placeholder-game.jpg';
  }

  private buildSubtitle(j: JuegoPlataformaGenero): string {
    const generos = (j.genero ?? []).map(g => g.nombre).filter(Boolean).join(' · ');
    const plataformas = (j.plataforma ?? []).map(p => p.nombre).filter(Boolean).join(', ');

    const partes: string[] = [];
    if (generos) partes.push(generos);
    if (plataformas) partes.push(plataformas);
    return partes.join(' — ') || j.descripcion?.slice(0, 90) + '...';
  }

  private buildBadge(j: JuegoPlataformaGenero): string | undefined {
    if (j.rating && j.rating >= 9) return 'Obra maestra';
    if (j.rating && j.rating >= 8) return 'Muy valorado';
    return undefined;
  }
}
