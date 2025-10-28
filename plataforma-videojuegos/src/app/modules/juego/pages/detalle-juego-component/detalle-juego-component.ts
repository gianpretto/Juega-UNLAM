import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Juego } from '../../../../shared/models/juego.model';
import { Imagen } from '../../../../shared/models/imagen.model';

@Component({
  selector: 'app-detalle-juego-component',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detalle-juego-component.html',
  styleUrls: ['./detalle-juego-component.css']
})
export class DetalleJuegoComponent implements OnInit {

  imagenActual = signal('');
  @Input() juego!: Juego;
  imagenes: string[] = [];
  
  ngOnInit(): void {
    if(this.juego){
    this.imagenes = this.juego.imagenes?.map(img => img.url) || [];
    }
  }
  imagenAMostrar = computed(() =>{
    return this.imagenActual() || this.imagenes[0];
  })

  cambiarImagen(imagen: string) {
    this.imagenActual.set(imagen);
  }

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
