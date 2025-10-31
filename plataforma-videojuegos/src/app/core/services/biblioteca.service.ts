import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, of } from 'rxjs';
import { Juego, UsuarioJuego } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { UsuarioJuegoService } from './usuario-juego.service';
import { isPlatformBrowser } from '@angular/common';

/**
 * Servicio para manejar la biblioteca de juegos del usuario
 * 
 * La biblioteca del usuario se gestiona mediante la tabla Usuario_Juego
 * que vincula usuarios con sus juegos adquiridos.
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
  private readonly usuarioJuegoService = inject(UsuarioJuegoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  // TODO: Obtener el ID del usuario desde un servicio de autenticación
  private usuarioId = 1; // ID del usuario actual (cambiar según necesites)

  /**
   * Permite cambiar el ID del usuario actual
   * Útil para testing o hasta que se implemente autenticación
   */
  setUsuarioId(id: number): void {
    this.usuarioId = id;
    console.log(`📚 Usuario de biblioteca cambiado a ID: ${id}`);
  }

  /**
   * Obtiene el ID del usuario actual
   */
  getUsuarioId(): number {
    return this.usuarioId;
  }

  /**
   * Obtiene todos los juegos de la biblioteca del usuario actual
   * Consulta la tabla Usuario_Juego y retorna los juegos vinculados
   */
  obtenerJuegos(): Observable<Juego[]> {
    return this.usuarioJuegoService.obtenerJuegosDeUsuario(this.usuarioId).pipe(
      map((usuarioJuegos: UsuarioJuego[]) => {
        // Extraer solo los juegos de la relación Usuario_Juego
        return usuarioJuegos
          .map(uj => uj.juego)
          .filter((juego): juego is Juego => juego !== undefined);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Agrega un juego a la biblioteca del usuario actual
   * Crea un registro en Usuario_Juego
   */
  agregarJuego(juego: Juego): Observable<UsuarioJuego> {
    return this.usuarioJuegoService.agregarJuegoAUsuario({
      usuarioId: this.usuarioId,
      juegoId: juego.id,
      detalle: `Juego "${juego.nombre}" agregado a la biblioteca`
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un juego de la biblioteca del usuario actual
   * Elimina el registro de Usuario_Juego
   */
  eliminarJuego(juegoId: number): Observable<void> {
    return this.usuarioJuegoService.eliminarJuegoDeUsuario({
      usuarioId: this.usuarioId,
      juegoId: juegoId
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los IDs de juegos favoritos del usuario
   * TODO: Implementar endpoint en backend para favoritos
   */
  obtenerFavoritos(): Observable<number[]> {
    // Solo usar localStorage en el navegador, no en SSR
    if (!this.isBrowser) {
      return of([]);
    }
    
    // Temporalmente usar localStorage hasta tener endpoint
    const stored = localStorage.getItem('biblioteca_favoritos');
    if (stored) {
      const favoritos = JSON.parse(stored) as number[];
      return of(favoritos);
    }
    return of([]);
  }

  /**
   * Agrega un juego a favoritos
   * TODO: Implementar endpoint en backend para favoritos
   */
  agregarAFavoritos(juegoId: number): Observable<void> {
    if (!this.isBrowser) {
      return of(void 0);
    }
    
    const stored = localStorage.getItem('biblioteca_favoritos');
    const favoritos: number[] = stored ? JSON.parse(stored) : [];
    if (!favoritos.includes(juegoId)) {
      favoritos.push(juegoId);
      localStorage.setItem('biblioteca_favoritos', JSON.stringify(favoritos));
    }
    console.log('❤️ Agregado a favoritos');
    return of(void 0);
  }

  /**
   * Quita un juego de favoritos
   * TODO: Implementar endpoint en backend para favoritos
   */
  quitarDeFavoritos(juegoId: number): Observable<void> {
    if (!this.isBrowser) {
      return of(void 0);
    }
    
    const stored = localStorage.getItem('biblioteca_favoritos');
    const favoritos: number[] = stored ? JSON.parse(stored) : [];
    const filtered = favoritos.filter(id => id !== juegoId);
    localStorage.setItem('biblioteca_favoritos', JSON.stringify(filtered));
    console.log('💔 Quitado de favoritos');
    return of(void 0);
  }

  /**
   * Verifica si un juego ya está en la biblioteca del usuario
   */
  estaEnBiblioteca(juegoId: number): Observable<boolean> {
    return this.obtenerJuegos().pipe(
      map((juegos: Juego[]) => juegos.some(j => j.id === juegoId)),
      catchError(() => of(false))
    );
  }

  /**
   * Manejo centralizado de errores HTTP
   * @param error - Error HTTP
   * @returns Observable con error formateado
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en BibliotecaService:', error);
    return throwError(() => new Error('Error al procesar la solicitud. Por favor, intenta nuevamente.'));
  }
}
