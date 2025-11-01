import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleJuegoComponent } from '@modules/juego/components/detalle-juego-component/detalle-juego-component';
import { OpcionesComponent } from '@modules/juego/components/opciones-component/opciones-component';
import { ValoracionesComponent } from '@modules/juego/components/valoraciones-component/valoraciones-component';
import { JuegoService } from '@servicios/juego.service';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '@interfaces/juego.interface';

@Component({
  selector: 'app-juego-component',
  imports: [CommonModule, DetalleJuegoComponent, OpcionesComponent,ValoracionesComponent],
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
            console.log("TRAJE EL JUEGO", data);
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
