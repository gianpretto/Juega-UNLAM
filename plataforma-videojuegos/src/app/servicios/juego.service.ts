import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {  Juego } from '@interfaces/juego.interface';
import { Imagen } from '@interfaces/image.interface';
import { Review } from '@interfaces/review.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@evironment/environment';
import { JuegoMapper } from '@mapper/juego.mapper';
import { FilterOption } from "@interfaces/filter-options.interface";
import { JuegoPlataformaGenero } from '@general/interfaces/juego-plafatorma-genero.interface';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private httpClient = inject(HttpClient);

  getJuegos(): Observable<JuegoPlataformaGenero[]>{
    return this.httpClient.get<JuegoPlataformaGenero[]>(`${environment.BACKEND_URL}/juego/`)
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
  
    guardarBusquedaEnSesion(term: string): void {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('nombreSeleccionado', term);
      }
    }
    guardarGeneroEnSesion(genre: string): void {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('generoSeleccionado', genre);
      }
    }
    guardarPlataformaEnSesion(platform: string): void {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('plataformaSeleccionada', platform);
      }
    }
    guardarOrdenamientoEnSesion(sort: string): void {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('ordenamientoSeleccionado', sort);
      }
    }
  
  
    obtenerOpcionesDeFiltradoEnSesion(): FilterOption[]{
      let term = '';
      let genre = '';
      let platform = '';
      let sort = '';

      // Proteger contra SSR
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        term = sessionStorage.getItem('nombreSeleccionado') || '';
        genre = sessionStorage.getItem('generoSeleccionado') || '';
        platform = sessionStorage.getItem('plataformaSeleccionada') || '';
        sort = sessionStorage.getItem('ordenamientoSeleccionado') || '';
      }

      return [{
        name : "nombreSeleccionado",
        value : term
      },
      {
        name : "generoSeleccionado",
        value : genre
      },
      {
        name : "plataformaSeleccionada",
        value : platform
      },
      {
        name : "ordenamientoSeleccionado",
        value : sort
      }
    ];
    }
  
  
    clearFilters(){
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        const keepKey = 'idUsuario';
        const keysToRemove: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key !== keepKey) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => sessionStorage.removeItem(k));
      }
    }


}