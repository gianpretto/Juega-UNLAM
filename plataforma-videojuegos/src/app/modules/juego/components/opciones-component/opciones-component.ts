import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../../core/services/carrito.service';

@Component({
  selector: 'app-opciones-component',
  imports: [ButtonModule,CurrencyPipe],
  templateUrl: './opciones-component.html',
  styleUrl: './opciones-component.css'
})
export class OpcionesComponent {

  @Input() juego!: Juego;

  constructor(private carritoService: CarritoService){}
  
  agregarAlCarrito() {
    this.carritoService.agregarJuego(this.juego);
  }
}
