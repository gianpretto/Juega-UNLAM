import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of, delay, map } from 'rxjs';
import { Juego } from '../../shared/models';
import { Juego as JuegoRawg } from '../../modules/biblioteca/interfaces/juego.interface';
import { environment } from '../../../environments/environment';

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
  private readonly apiUrl = `${environment.apiUrl}/biblioteca`;

  // Almacenamiento temporal en memoria (simulando backend)
  // TODO: Reemplazar con llamadas reales a la API cuando esté disponible
  private juegosGuardados: JuegoRawg[] = [];
  private favoritosIds: Set<number> = new Set();

  /**
   * Obtiene todos los juegos de la biblioteca del usuario
   * NOTA: Por ahora retorna datos de localStorage/memoria
   * TODO: Reemplazar con llamada HTTP real cuando el backend esté listo
   */
  obtenerJuegos(): Observable<JuegoRawg[]> {
    // Simulación de carga desde localStorage
    const stored = localStorage.getItem('biblioteca_juegos');
    if (stored) {
      this.juegosGuardados = JSON.parse(stored);
    }

    // Simular delay de red
    return of(this.juegosGuardados).pipe(
      delay(300),
      catchError(this.handleError)
    );
  }

  /**
   * Agrega un juego a la biblioteca
   */
  agregarJuego(juego: JuegoRawg): Observable<void> {
    // Verificar que no esté ya agregado
    if (!this.juegosGuardados.find(j => j.id === juego.id)) {
      this.juegosGuardados.push(juego);
      localStorage.setItem('biblioteca_juegos', JSON.stringify(this.juegosGuardados));
      console.log('✅ Juego agregado a biblioteca:', juego.name);
    }

    return of(void 0).pipe(delay(200));
  }

  /**
   * Elimina un juego de la biblioteca
   */
  eliminarJuego(juegoId: number): Observable<void> {
    this.juegosGuardados = this.juegosGuardados.filter(j => j.id !== juegoId);
    localStorage.setItem('biblioteca_juegos', JSON.stringify(this.juegosGuardados));

    // También quitar de favoritos si estaba
    this.favoritosIds.delete(juegoId);
    this.guardarFavoritos();

    console.log('🗑️ Juego eliminado de biblioteca');
    return of(void 0).pipe(delay(200));
  }

  /**
   * Obtiene los IDs de juegos favoritos
   */
  obtenerFavoritos(): Observable<number[]> {
    const stored = localStorage.getItem('biblioteca_favoritos');
    if (stored) {
      const favoritos = JSON.parse(stored) as number[];
      this.favoritosIds = new Set(favoritos);
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
    const stored = localStorage.getItem('biblioteca_juegos');
    if (stored) {
      const juegos = JSON.parse(stored) as JuegoRawg[];
      return of(juegos.some(j => j.id === juegoId));
    }
    return of(false);
  }

  /**
   * Guarda favoritos en localStorage
   */
  private guardarFavoritos(): void {
    localStorage.setItem('biblioteca_favoritos', JSON.stringify(Array.from(this.favoritosIds)));
  }

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
