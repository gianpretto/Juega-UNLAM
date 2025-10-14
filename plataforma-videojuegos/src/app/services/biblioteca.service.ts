import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Juego } from '../shared/models';
import { environment } from '../../environments/environment';

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
  providedIn: 'root' // 👈 Hace que el servicio sea singleton en toda la app
})
export class BibliotecaService {
  // 👇 Nueva forma de inyección de dependencias (Angular 14+)
  private readonly http = inject(HttpClient);

  // 👇 URL base de la API (la configuraremos en environment)
  private readonly apiUrl = `${environment.apiUrl}/biblioteca`;

  /**
   * Obtiene todos los juegos de la biblioteca del usuario
   * @returns Observable con array de juegos
   */
  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl).pipe(
      catchError(this.handleError) // 👈 Manejo centralizado de errores
    );
  }

  /**
   * Obtiene un juego específico por ID
   * @param id - ID del juego
   * @returns Observable con el juego
   */
  getJuegoById(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca juegos por nombre
   * @param searchTerm - Término de búsqueda
   * @returns Observable con juegos filtrados
   */
  searchJuegos(searchTerm: string): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.apiUrl}/search`, {
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
