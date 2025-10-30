import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Juego } from '../../../modules/juego/interfaces/juego.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { JuegoMapper } from './juego-mapper/juego.mapper';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  httpClient = inject(HttpClient);


  
  getJuegoById(id: number):Observable<Juego> {
    
    return this.httpClient.get<Juego>(`${environment.BACKEND_URL}/api/juegos/${id}`)
    .pipe(
      map((res) => {
        return JuegoMapper.mapRestJuegoToJuego(res);
      })
    );
  }


    obtenerImagenesDeUnJuego(id:number):Observable<string[]>{
    return this.httpClient.get<string[]>(`${environment.BACKEND_URL}/api/juegos/imagenes/${id}`);
  }
}
