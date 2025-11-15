import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import {Juego } from '@interfaces/juego.interface';
import {Imagen } from '@interfaces/image.interface';
import { JuegoService } from '@servicios/juego.service';




@Component({
  selector: 'app-detalle-juego-component',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detalle-juego-component.html',
  styleUrls: ['./detalle-juego-component.css']
})
export class DetalleJuegoComponent implements OnInit {

  juegoService = inject(JuegoService);

  imagenActual = signal('');
  @Input() juego!: Juego;
  imagenes: string[] = [];
  
  ngOnInit(): void {
    if(this.juego){
    this.obtenerImagenesDeUnJuego(this.juego.id);
    }
  }
  
  imagenAMostrar = computed(() =>{
    return this.imagenActual() || this.imagenes[0] || '';
  })

  cambiarImagen(imagen: string) {
    this.imagenActual.set(imagen);
  }


  obtenerImagenesDeUnJuego(id:number){
    this.juegoService.obtenerImagenesDeUnJuego(this.juego.id).subscribe({
      next : (data) => {
        const imagenPrincipal = data.find((img: { url: string, isMain: boolean }) => img.isMain === true);
        const imagenesSecundarias = data.filter((img: { url: string, isMain: boolean }) => img.isMain === false);
        
        this.imagenes = [
          ...(imagenPrincipal ? [imagenPrincipal.url] : []),
          ...imagenesSecundarias.map((img: { url: string }) => img.url)
        ];
      }
    });
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
