import { Component, OnInit } from "@angular/core";
import {Juego} from "../../interfaces/juego.interface";
import { inject } from "@angular/core";
import { JuegoService } from "../../../../api/api-rawg/juego/juego.service";
import {TableModule} from "primeng/table";

@Component({
  selector: "app-list-juegos",
  imports: [TableModule],
  templateUrl: "./list-juegos.html",
  styleUrls: ["./list-juegos.css"]
})
export class ListJuegosComponent implements OnInit {
  juegos: Juego[] = [];


  //el constructor se dispara antes que cualquier ciclo de vida como onInit
  constructor() {}

  juegoService = inject(JuegoService);

  ngOnInit(): void {
    console.log("Componente ListJuegosComponent inicializado");
    this.listJuegos();
  }

  listJuegos(){
    this.juegoService.getJuegos().subscribe({
      next: (data)=>{
        this.juegos = data;
        console.log(data);

      },
      error: (error)=>{
        console.error('Error al obtener los juegos:', error);
      },
      complete: ()=>{
        console.log('Solicitud de juegos completada');
      }
    });
  }

}
