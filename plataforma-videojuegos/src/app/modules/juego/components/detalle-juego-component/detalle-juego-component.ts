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
    console.log("ESTE ES EL JUEGO: ",this.juego);
    if(this.juego){
      console.log(this.juego);
    this.obtenerImagenesDeUnJuego(this.juego.id);
    }
  }
  
  // Usar la primera imagen disponible o la imagen seleccionada
  imagenAMostrar = computed(() =>{
    return this.imagenActual() || this.imagenes[0] || '';
  })

  cambiarImagen(imagen: string) {
    this.imagenActual.set(imagen);
  }


  obtenerImagenesDeUnJuego(id:number){
    this.juegoService.obtenerImagenesDeUnJuego(this.juego.id).subscribe({
      next : (data) => {
        console.log("LAS IMAGENES:",data)
        // Obtener TODAS las imágenes, priorizando la imagen principal (isMain: true)
        const imagenPrincipal = data.find((img: { url: string, isMain: boolean }) => img.isMain === true);
        const imagenesSecundarias = data.filter((img: { url: string, isMain: boolean }) => img.isMain === false);
        
        // Poner la imagen principal primero, luego las secundarias
        this.imagenes = [
          ...(imagenPrincipal ? [imagenPrincipal.url] : []),
          ...imagenesSecundarias.map((img: { url: string }) => img.url)
        ];
      },
      error : (data) => {
        console.log("ERROR AL TREAR LAS IMAGENES",data)
      },
      complete : () => {
        console.log("IMAGENES TRAIDAS")
      },
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
