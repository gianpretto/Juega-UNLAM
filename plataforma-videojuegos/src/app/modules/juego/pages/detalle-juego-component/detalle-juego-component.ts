import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../core/services/juego/juego.service';
import { subscribe } from 'diagnostics_channel';


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
    this.juegoService.obtenerImagenesDeUnJuego(this.juego.id).subscribe({
      next : (data) => {
        console.log("LAS IMAGENES:",data)
        this.imagenes = data;
      },
      error : (data) => {
        console.log("ERROR AL TREAR LAS IMAGENES",data)
      },
      complete : () => {
        console.log("IMAGENES TRAIDAS")
      },
    });
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
