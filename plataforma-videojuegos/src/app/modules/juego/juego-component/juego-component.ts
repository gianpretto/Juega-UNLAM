import { Component } from '@angular/core';
import { DetalleJuegoComponent } from '../detalle-juego-component/detalle-juego-component';
import { OpcionesComponent } from '../opciones-component/opciones-component';
import { ValoracionesComponent } from '../valoraciones-component/valoraciones-component';

@Component({
  selector: 'app-juego-component',
  imports: [DetalleJuegoComponent, OpcionesComponent,ValoracionesComponent],
  templateUrl: './juego-component.html',
  styleUrl: './juego-component.css'
})
export class JuegoComponent {
    
}
