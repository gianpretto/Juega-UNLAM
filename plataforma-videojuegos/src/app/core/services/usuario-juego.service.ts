import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioJuego } from '../../shared/models';

interface AgregarUsuarioJuegoPayload {
  usuarioId: number;
  juegoId: number;
  detalle?: string;
}

interface EliminarUsuarioJuegoPayload {
  usuarioId?: number;
  juegoId?: number;
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class UsuarioJuegoService {
  private base = `${environment.apiUrl}usuario-juego`;

  constructor(private http: HttpClient) {}

  agregarJuegoAUsuario(payload: AgregarUsuarioJuegoPayload): Observable<UsuarioJuego> {
    return this.http.post<UsuarioJuego>(this.base, payload);
  }

  obtenerJuegosDeUsuario(usuarioId: number): Observable<UsuarioJuego[]> {
    return this.http.get<UsuarioJuego[]>(`${this.base}/usuario/${usuarioId}`);
  }

  obtenerUsuariosDeJuego(juegoId: number): Observable<UsuarioJuego[]> {
    return this.http.get<UsuarioJuego[]>(`${this.base}/juego/${juegoId}`);
  }

  eliminarJuegoDeUsuario(payload: EliminarUsuarioJuegoPayload): Observable<void> {
    // Angular HttpClient soporta body en delete via options
    return this.http.delete<void>(this.base, { body: payload });
  }
}