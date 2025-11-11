import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { CurrencyPipe } from '@angular/common';
import { JuegoService } from '@general/servicios/juego.service';

@Component({
  selector: 'app-opciones-component',
  imports: [ButtonModule,CurrencyPipe],
  templateUrl: './opciones-component.html',
  styleUrl: './opciones-component.css'
})
export class OpcionesComponent implements OnInit {

  ngOnInit(): void {
    this.obtenerImagenDePortada();
  }

  @Input() juego!: Juego;
  imagen:string = '';

  juegoService = inject(JuegoService);

  obtenerImagenDePortada(){
    this.juegoService.obtenerImagenesDeUnJuego(this.juego.id).subscribe({
      next : (data) => {
        this.imagen = data[0].url;
      },
      error : (data) => {
        console.log("COMPONENTE OPCIONES NO PUDO OBTENER LA IMAGEN")
      }
    })
  }

}
