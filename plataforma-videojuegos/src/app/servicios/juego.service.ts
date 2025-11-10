import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {  Juego } from '@interfaces/juego.interface';
import { Imagen } from '@interfaces/image.interface';
import { Review } from '@interfaces/review.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@evironment/environment';
import { JuegoMapper } from '@mapper/juego.mapper';
import { FilterOption } from "@interfaces/filter-options.interface";

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private httpClient = inject(HttpClient);

  getJuegos(): Observable<Juego[]>{
    return this.httpClient.get<Juego[]>(`${environment.BACKEND_URL}/juego/`)
  }

  
  getJuegoById(id: number):Observable<Juego> {
    
    return this.httpClient.get<Juego>(`${environment.BACKEND_URL}/juego/${id}`)
  }


    obtenerImagenesDeUnJuego(id:number):Observable<Imagen[]>{
    return this.httpClient.get<Imagen[]>(`${environment.BACKEND_URL}/juego/imagenes/${id}`);
  }


  obtenerReviewsDeUnJuego(id:number):Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${environment.BACKEND_URL}/juego/reviews/${id}`);
  }
  
    saveTermInSession(term: string): void {
      //localStorage.setItem('searchTerm', term);
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('searchTerm', term);
      }
    }
    saveGenreInSession(genre: string): void {
      //localStorage.setItem('genre', genre);
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('genre', genre);
      }
    }
    savePlatformInSession(platform: string): void {
      //localStorage.setItem('platform', platform);
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('platform', platform);
      }
    }
    saveSortInSession(sort: string): void {
      //localStorage.setItem('sort', sort);
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('sort', sort);
      }
    }
  
  
    getSessionFilteredGames(): FilterOption[]{
      let term = '';
      let genre = '';
      let platform = '';
      let sort = '';

      // Proteger contra SSR
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        term = sessionStorage.getItem('searchTerm') || '';
        genre = sessionStorage.getItem('genre') || '';
        platform = sessionStorage.getItem('platform') || '';
        sort = sessionStorage.getItem('sort') || '';
      }

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
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
    }


}