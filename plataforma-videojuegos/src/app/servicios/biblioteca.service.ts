import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of, delay, map } from 'rxjs';
import { Juego } from '@interfaces/juego.interface';
import { UsuarioJuego } from '@interfaces/usuario-juego.interface';
import { environment } from '@evironment/environment';
import { UsuarioService } from './usuario.service';



@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private readonly http = inject(HttpClient);
  private readonly usuarioService = inject(UsuarioService);

  private readonly baseApiUrl = `${environment.BACKEND_URL}/usuario-juego`;

  private favoritosIds: Set<number> = new Set();


  
  obtenerJuegos(usuarioId?: number): Observable<Juego[]> {
    const id = usuarioId ?? this.usuarioService.obtenerUsuarioDeSesion();

    if (!id) {
      return throwError(() => new Error('Debes iniciar sesión para ver tu biblioteca'));
    }

    const apiUrl = `${this.baseApiUrl}/usuario/${id}`;
    return this.http.get<UsuarioJuego[]>(apiUrl).pipe(
      map(usuarioJuegos => {
     
        return usuarioJuegos.map(uj => uj.juego);
      }),
      catchError(this.handleError)
    );
  }


  agregarJuego(juego: Juego): Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}`, { juegoId: juego.id }).pipe(
      map(() => {
        console.log('✅ Juego agregado a biblioteca:', juego.nombre);
      }),
      catchError(this.handleError)
    );
  }

  eliminarJuego(juegoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/${juegoId}`).pipe(
      map(() => {
        this.favoritosIds.delete(juegoId);
        this.guardarFavoritos();
      }),
      catchError(this.handleError)
    );
  }


  obtenerFavoritos(): Observable<number[]> {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('biblioteca_favoritos');
      if (stored) {
        const favoritos = JSON.parse(stored) as number[];
        this.favoritosIds = new Set(favoritos);
      }
    }

    return of(Array.from(this.favoritosIds)).pipe(delay(200));
  }


  agregarAFavoritos(juegoId: number): Observable<void> {
    this.favoritosIds.add(juegoId);
    this.guardarFavoritos();
    return of(void 0).pipe(delay(200));
  }

  
  quitarDeFavoritos(juegoId: number): Observable<void> {
    this.favoritosIds.delete(juegoId);
    this.guardarFavoritos();
    return of(void 0).pipe(delay(200));
  }


  estaEnBiblioteca(juegoId: number): Observable<boolean> {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('biblioteca_juegos');
      if (stored) {
        const juegos = JSON.parse(stored) as Juego[];
        return of(juegos.some(j => j.id === juegoId));
      }
    }
    return of(false);
  }

  
  private guardarFavoritos(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('biblioteca_favoritos', JSON.stringify(Array.from(this.favoritosIds)));
    }
  }

  getJuegoById(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.baseApiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  searchJuegos(searchTerm: string): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.baseApiUrl}/search`, {
      params: { q: searchTerm }
    }).pipe(
      catchError(this.handleError)
    );
  }

 
  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Error al cargar los juegos. Por favor, intenta nuevamente.'));
  }

  estaComprado(juegoId: number): Observable<boolean> {
    return this.obtenerJuegos().pipe(
      map(juegos => juegos.some(j => j.id === juegoId)),
      catchError(() => of(false)) 
    );
  }

}