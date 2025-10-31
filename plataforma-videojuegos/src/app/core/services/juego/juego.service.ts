import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Imagen, Juego, Review } from '../../../modules/juego/interfaces/juego.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { JuegoMapper } from './juego-mapper/juego.mapper';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private httpClient = inject(HttpClient);


  
  getJuegoById(id: number):Observable<Juego> {
    
    return this.httpClient.get<Juego>(`${environment.BACKEND_URL}/api/juegos/${id}`)
    .pipe(
      map((res) => {
        return JuegoMapper.mapRestJuegoToJuego(res);
      })
    );
  }


    obtenerImagenesDeUnJuego(id:number):Observable<Imagen[]>{
    return this.httpClient.get<Imagen[]>(`${environment.BACKEND_URL}/api/juegos/imagenes/${id}`);
  }


  obtenerReviewsDeUnJuego(id:number):Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${environment.BACKEND_URL}/api/juegos/reviews/${id}`);
  }
}
