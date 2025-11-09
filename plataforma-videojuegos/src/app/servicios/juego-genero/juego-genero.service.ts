import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@evironment/environment';
import { JuegoGenero } from '@general/interfaces/juego-genero.interface';
import { Juego } from '@general/interfaces/juego.interface';
import { Genero } from '@general/interfaces/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class JuegoGeneroService {
  private httpClient = inject(HttpClient);

  obtenerJuegosGeneros():Observable<JuegoGenero[]>{
      return this.httpClient.get<JuegoGenero[]>(`${environment.BACKEND_URL}/genero/`)
    }

    /*result.filter(juego =>
        juego.nombre ? juego.nombre.toLowerCase().includes(term) : false
      );*/

  filtrarJuegosPorGenero(result:Juego[],selectedGenre:string,generos:Genero[],juegosGeneros:JuegoGenero[]):Juego[]{
    
    let generosFiltradosPorNombre:Genero[] = this.filtrarGenerosPorNombre(selectedGenre,generos);
    let juegosFiltradosPorGenero:Juego[] = this.filtrarJuegosEnBaseAlGeneroSeleccionado(result,generosFiltradosPorNombre,juegosGeneros);

    return result;
  }

  private filtrarGenerosPorNombre(selectedGenre:string,generos:Genero[]):Genero[]{
    return generos.filter(g => g.nombre == selectedGenre);
  }

  private filtrarJuegosEnBaseAlGeneroSeleccionado(result: Juego[],generosFiltradosPorNombre : Genero[],juegosGeneros: JuegoGenero[]):Juego[]{
    let juegosG
    return result.filter(juego => juego.id == )
  }
}
