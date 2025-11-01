import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Imagen, Juego, Review } from '../../../modules/juego/interfaces/juego.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { JuegoMapper } from './juego-mapper/juego.mapper';
import { FilterOption } from "../../../modules/biblioteca/interfaces/filter-options.interface";

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
  getJuegos():Observable<Juego[]>{
    return this.httpClient.get<any>(`${environment.apiUrl}games?key=${environment.rawgApiKey}&page_size=10`)
    .pipe(
      map((response: any) =>{
        //console.log('📦 Respuesta completa:', response);
        //console.log('🎮 Solo results:', response.results);
        //console.log('🔢 Tipo de results:', Array.isArray(response.results));
         return response.results
        })
    )
  }
  
  getJuegoById(id: number):Observable<Juego>{
      return this.httpClient.get<any>(`${environment.apiUrl}games/${id}?key=${environment.rawgApiKey}`)
      .pipe(
        map((response: any) =>{
          return response
        })
      )
    }
  
    /*getSessionFilteredGames(): Juego[]{
      const juego : Juego[] = [];
      return juego;
    }*/
  
  
    saveTermInSession(term: string): void {
      //localStorage.setItem('searchTerm', term);
      sessionStorage.setItem('searchTerm', term);
    }
    saveGenreInSession(genre: string): void {
      //localStorage.setItem('genre', genre);
      sessionStorage.setItem('genre', genre);
    }
    savePlatformInSession(platform: string): void {
      //localStorage.setItem('platform', platform);
      sessionStorage.setItem('platform', platform);
    }
    saveSortInSession(sort: string): void {
      //localStorage.setItem('sort', sort);
      sessionStorage.setItem('sort', sort);
    }
  
  
    getSessionFilteredGames(): FilterOption[]{
      const term :string = sessionStorage.getItem('searchTerm') || '';
      const genre:string = sessionStorage.getItem('genre') || '';
      const platform:string = sessionStorage.getItem('platform') || '';
      const sort:string = sessionStorage.getItem('sort') || '';
      return [{
        name : "term",
        value : term
      },
      {
        name : "genre",
        value : genre
      },
      {
        name : "platform",
        value : platform
      },
      {
        name : "sort",
        value : sort
      }
    ];
    }
  
  
    clearFilters(){
      sessionStorage.clear();
    }
}
