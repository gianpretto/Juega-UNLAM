import { Component, inject, OnInit } from '@angular/core';
import { DetalleJuegoComponent } from '../detalle-juego-component/detalle-juego-component';
import { OpcionesComponent } from '../opciones-component/opciones-component';
import { ValoracionesComponent } from '../valoraciones-component/valoraciones-component';
import { JuegoService } from '../../../../core/services/juego/juego.service';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';

@Component({
  selector: 'app-juego-component',
  imports: [DetalleJuegoComponent, OpcionesComponent,ValoracionesComponent],
  templateUrl: './juego-component.html',
  styleUrl: './juego-component.css'
})
export class JuegoComponentDetalle implements OnInit {
    idJuego!: number;
    juego!: Juego;

    juegoService = inject(JuegoService);
    route = inject(ActivatedRoute)

    ngOnInit(): void {
      this.idJuego = Number(this.route.snapshot.paramMap.get('id'));
      this.listarJuego(this.idJuego)
    }



    listarJuego(id: number){
        this.juegoService.getJuegoById(id).subscribe({
          next: (data) => {
            this.juego = data;
          },
          error: (data) => {
            console.log("ERROR AL TRAER EL JUEGO",data);
          },
          complete: () => {
            console.log("JUEGO TRAIDO CON EXITO");
          }
        });
    }

}
