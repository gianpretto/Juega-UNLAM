import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Juego } from '../../shared/models';

/**
 * Servicio para gestionar juegos desde la API REST
 * 
 * Endpoints disponibles:
 * - GET /juegos - Lista todos los juegos
 * - GET /juegos/:id - Obtiene un juego por ID
 * - DELETE /juegos/:id - Elimina un juego (admin)
 */
@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private base = `${environment.apiUrl}juegos`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los juegos disponibles en el catálogo
   * El backend debe incluir las relaciones: genero, desarrollador, plataformas
   */
  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.base).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene un juego específico por su ID
   * El backend debe incluir las relaciones completas
   */
  getJuegoPorId(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.base}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un juego del catálogo (solo admin)
   * TODO: Agregar verificación de permisos de administrador
   */
  eliminarJuego(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en JuegoService:', error);
    let errorMessage = 'Error al procesar la solicitud de juegos.';
    
    if (error.status === 404) {
      errorMessage = 'Juego no encontrado.';
    } else if (error.status === 0) {
      errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
