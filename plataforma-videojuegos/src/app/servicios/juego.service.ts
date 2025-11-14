import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export type CardVM = {
  id: number;
  nombre: string;
  precio: number;

  // IMAGEN PRINCIPAL
  imagen: string;         // lo que usa la card
  coverUrl?: string;      // viene del backend

  // OFERTAS
  descuento?: number;     // alias genérico
  discount?: number;      // backend puede enviarlo así
  finalPrice?: number;    // precio con descuento

  // VARIOS
  imagenes?: string[];
  rating?: number;
  tags?: string[];
};

export type ReviewVM = {
  id: number;
  usuarioId: number;
  puntaje: number;      // 1..10 ó 1..5
  comentario?: string;
  fecha?: string;
};

@Injectable({ providedIn: 'root' })
export class JuegoService {
  /** Base de la API real */
  private base = `${environment.BACKEND_URL}/api/juegos`;

  /** Clave para filtros en sessionStorage */
  private FILTERS_KEY = 'catalogo-filtros';

  constructor(private http: HttpClient) {}

  // ============ NUEVOS MÉTODOS “OFICIALES” ============

  /** Catálogo con ofertas incorporadas */
  getCatalogo(params?: { q?: string; page?: number; limit?: number; sort?: string }): Observable<CardVM[]> {
    let p = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) p = p.set(k, String(v));
      });
    }
    return this.http.get<any[]>(`${this.base}`, { params: p }).pipe(
      map(rows => rows.map(r => ({
        id: r.id,
        nombre: r.nombre ?? r.title,
        precio: r.precio ?? r.originalPrice,
        imagen: r.coverUrl ?? r.imagen ?? '',
        descuento: r.discount ?? 0,
        finalPrice: r.finalPrice ?? r.precio
      } as CardVM)))
    );
  }

  /** Carrusel de ofertas */
  getOfertas(limit = 8): Observable<CardVM[]> {
    const params = new HttpParams().set('limit', String(limit));
    return this.http.get<any[]>(`${this.base}/offers`, { params }).pipe(
      map(rows => rows.map(r => ({
        id: r.id,
        nombre: r.nombre ?? r.title,
        precio: r.precio ?? r.originalPrice,
        imagen: r.coverUrl ?? '',
        descuento: r.discount ?? 0,
        finalPrice: r.finalPrice ?? r.precio ?? r.originalPrice
      } as CardVM)))
    );
  }

  /** Detalle por ID */
  getJuegoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`);
  }

  /** Imágenes del juego (requiere endpoint /:id/imagenes en tu back) */
  obtenerImagenesDeUnJuego(id: number): Observable<string[]> {
    return this.http.get<{ url: string }[] | string[]>(`${this.base}/${id}/imagenes`).pipe(
      map(rows => Array.isArray(rows)
        ? (typeof rows[0] === 'string' ? rows as string[] : (rows as {url:string}[]).map(x => x.url))
        : [])
    );
  }

  /** Reviews del juego (requiere endpoint /:id/reviews en tu back) */
  obtenerReviewsDeUnJuego(id: number): Observable<ReviewVM[]> {
    return this.http.get<any[]>(`${this.base}/${id}/reviews`).pipe(
      map(rows => rows.map(r => ({
        id: r.id,
        usuarioId: r.usuarioId ?? r.userId,
        puntaje: r.puntaje ?? r.rating ?? 0,
        comentario: r.comentario ?? r.comment ?? '',
        fecha: r.fecha ?? r.createdAt ?? null
      } as ReviewVM)))
    );
  }

  // ============ CAPA DE COMPATIBILIDAD ============

  /** Compat: el catálogo antiguo */
  getJuegos(): Observable<CardVM[]> {
    return this.getCatalogo({ limit: 24, sort: 'fechaLanzamiento:desc' });
  }

  /** Compat: filtros persistidos en sesión */
  getSessionFilteredGames(): any {
    try {
      const raw = sessionStorage.getItem(this.FILTERS_KEY);
      return raw ? JSON.parse(raw) : { categorias: [], plataformas: [], rangoPrecio: null, soloOfertas: false };
    } catch {
      return { categorias: [], plataformas: [], rangoPrecio: null, soloOfertas: false };
    }
  }

  /** Compat: limpiar filtros de sesión */
  clearFilters(): void {
    sessionStorage.removeItem(this.FILTERS_KEY);
  }
}
