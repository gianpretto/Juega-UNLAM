import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-detalle-juego-component',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detalle-juego-component.html',
  styleUrls: ['./detalle-juego-component.css']
})
export class DetalleJuegoComponent {

  imagenes: string[] = [
    'assets/images/imagen1.jpg',
    'assets/images/imagen2.jpg',
    'assets/images/imagen3.jpg',
    'assets/images/imagen4.jpg',
    'assets/images/imagen5.jpg',
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
