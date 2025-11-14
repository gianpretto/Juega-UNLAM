import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleJuegoComponent } from '@modules/juego/components/detalle-juego-component/detalle-juego-component';
import { OpcionesComponent } from '@modules/juego/components/opciones-component/opciones-component';
import { ValoracionesComponent } from '@modules/juego/components/valoraciones-component/valoraciones-component';
import { CarritoComponent } from '@modules/carrito-component/carrito-component';
import { JuegoService } from '@servicios/juego.service';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '@interfaces/juego.interface';

@Component({
  selector: 'app-juego-component',
  imports: [CommonModule, DetalleJuegoComponent, OpcionesComponent, ValoracionesComponent, CarritoComponent],
  templateUrl: './juego-component.html',
  styleUrl: './juego-component.css'
})
export class JuegoComponent implements OnInit {
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
          },
          complete: () => {
          }
        });
    }

}
