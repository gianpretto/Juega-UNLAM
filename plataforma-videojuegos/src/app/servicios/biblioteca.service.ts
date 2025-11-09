import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of, delay, map } from 'rxjs';
import { Juego } from '@interfaces/juego.interface';
import { UsuarioJuego } from '@interfaces/usuario-juego.interface';
import { environment } from '@evironment/environment';

/**
 * Servicio para manejar la biblioteca de juegos del usuario
 *
 * Buenas prácticas aplicadas:
 * - @Injectable con providedIn: 'root' para singleton
 * - inject() en lugar de constructor (Angular moderno)
 * - Manejo de errores centralizado
 * - Tipado fuerte con TypeScript
 */


@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private readonly http = inject(HttpClient);

  private readonly baseApiUrl = `${environment.BACKEND_URL}/usuario-juego`;

  // Almacenamiento temporal de favoritos en memoria
  private favoritosIds: Set<number> = new Set();

  /**
   * Obtiene todos los juegos de la biblioteca del usuario especificado
   * Llama al endpoint del backend que retorna usuario_juegos y extrae solo los juegos
   * @param usuarioId - ID del usuario del cual obtener la biblioteca
   */
  obtenerJuegos(usuarioId: number = 1): Observable<Juego[]> {
    const apiUrl = `${this.baseApiUrl}/usuario/${usuarioId}`;
    return this.http.get<UsuarioJuego[]>(apiUrl).pipe(
      map(usuarioJuegos => {
        console.log(`📦 Usuario-Juegos recibidos para usuario ${usuarioId}:`, usuarioJuegos.length);
        // Extraer solo el objeto juego de cada relación usuario-juego
        return usuarioJuegos.map(uj => uj.juego);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Agrega un juego a la biblioteca
   */
  agregarJuego(juego: Juego): Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}`, { juegoId: juego.id }).pipe(
      map(() => {
        console.log('✅ Juego agregado a biblioteca:', juego.nombre);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un juego de la biblioteca
   */
  eliminarJuego(juegoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/${juegoId}`).pipe(
      map(() => {
        // También quitar de favoritos si estaba
        this.favoritosIds.delete(juegoId);
        this.guardarFavoritos();
        console.log('🗑️ Juego eliminado de biblioteca');
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los IDs de juegos favoritos
   */
  obtenerFavoritos(): Observable<number[]> {
    // Proteger contra SSR - localStorage solo existe en el navegador
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('biblioteca_favoritos');
      if (stored) {
        const favoritos = JSON.parse(stored) as number[];
        this.favoritosIds = new Set(favoritos);
      }
    }

    return of(Array.from(this.favoritosIds)).pipe(delay(200));
  }

  /**
   * Agrega un juego a favoritos
   */
  agregarAFavoritos(juegoId: number): Observable<void> {
    this.favoritosIds.add(juegoId);
    this.guardarFavoritos();
    console.log('❤️ Agregado a favoritos');
    return of(void 0).pipe(delay(200));
  }

  /**
   * Quita un juego de favoritos
   */
  quitarDeFavoritos(juegoId: number): Observable<void> {
    this.favoritosIds.delete(juegoId);
    this.guardarFavoritos();
    console.log('💔 Quitado de favoritos');
    return of(void 0).pipe(delay(200));
  }

  /**
   * Verifica si un juego ya está en la biblioteca
   */
  estaEnBiblioteca(juegoId: number): Observable<boolean> {
    // Proteger contra SSR
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('biblioteca_juegos');
      if (stored) {
        const juegos = JSON.parse(stored) as Juego[];
        return of(juegos.some(j => j.id === juegoId));
      }
    }
    return of(false);
  }

  /**
   * Guarda favoritos en localStorage
   */
  private guardarFavoritos(): void {
    // Proteger contra SSR
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('biblioteca_favoritos', JSON.stringify(Array.from(this.favoritosIds)));
    }
  }

  /**
   * Obtiene un juego específico por ID
   * @param id - ID del juego
   * @returns Observable con el juego
   */
  getJuegoById(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.baseApiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca juegos por nombre
   * @param searchTerm - Término de búsqueda
   * @returns Observable con juegos filtrados
   */
  searchJuegos(searchTerm: string): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.baseApiUrl}/search`, {
      params: { q: searchTerm }
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores HTTP
   * @param error - Error HTTP
   * @returns Observable con error formateado
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en BibliotecaService:', error);
    return throwError(() => new Error('Error al cargar los juegos. Por favor, intenta nuevamente.'));
  }
}