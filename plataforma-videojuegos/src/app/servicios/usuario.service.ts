import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Usuario } from '@interfaces/usuario.interface';


import { BehaviorSubject, Observable, map, throwError } from 'rxjs';

import { UsuarioMapper } from '../mapper/usuario.mapper';
import { UsuarioRest } from '../rest/usuario.rest';
import { environment } from '@evironment/environment';
import {Juego} from '@interfaces/juego.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  http = inject(HttpClient);
  private readonly _isLoggedIn = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();
  private readonly _currentUser = new BehaviorSubject<Usuario | null>(null);
  readonly currentUser$: Observable<Usuario | null> = this._currentUser.asObservable();

  constructor() { }


  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.BACKEND_URL}/usuarios`);
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(`${environment.BACKEND_URL}/usuarios/${usuario.id}`);
  }

  verUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.BACKEND_URL}/usuarios/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.BACKEND_URL}/usuarios`, usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(`${environment.BACKEND_URL}/usuarios/${usuario.id}`, usuario);
  }

  loginUsuario(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.BACKEND_URL}/usuarios/login`, { email, password });
  }

  setCurrentUser(user: Usuario) {
    if (typeof window !== 'undefined' && user && user.id !== undefined) {
      sessionStorage.setItem('idUsuario', user.id.toString());
    }
    this._currentUser.next(user ?? null);
    this._isLoggedIn.next(!!user);
  }

  guardarUsuarioEnSesion(id: number) {
    sessionStorage.setItem("idUsuario", id.toString())
    this._isLoggedIn.next(true);
  }

  actualizarImagenes(id: number, data: { perfilUrl?: string | null; fondoPerfilUrl?: string | null; }) {
  return this.http.patch(`${environment.BACKEND_URL}/usuarios/${id}/imagenes`, data);
}



  obtenerUsuarioDeSesion(): number | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const id = sessionStorage.getItem('idUsuario');
    // Actualizar estado interno por si se consultó desde otro sitio
    const has = id ? true : false;
    this._isLoggedIn.next(has);
    return id ? parseInt(id, 10) : null;
  }

  /**
   * Intenta restaurar el usuario completo desde sessionStorage (si hay id)
   * Hace una llamada al backend para obtener los datos del usuario y los expone en currentUser$.
   */
  restoreFromSession(): void {
    const id = this.obtenerUsuarioDeSesion();
    if (!id) return;

    this.verUsuario(id).subscribe({
      next: (user) => {
        this._currentUser.next(user);
        this._isLoggedIn.next(true);
      },
      error: (_) => {
        this.logout();
      }
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('idUsuario');
    }
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }

  getSaldoUsuario(): Observable<number> {
    const id = this.obtenerUsuarioDeSesion();
    if (!id) return throwError(() => new Error('No hay usuario logueado'));

    return this.http
      .get<{ saldo: number }>(`${environment.BACKEND_URL}/usuarios/${id}/saldo`)
      .pipe(map(res => res.saldo));
  }
  actualizarSaldoUsuario(monto: number) {
    const id = this.obtenerUsuarioDeSesion();
    if (!id) return throwError(() => new Error('No hay usuario logueado'));

    return this.http.put(`${environment.BACKEND_URL}/usuarios/${id}/descontar-saldo`, { monto });
  }

  registrarJuegos(juegos: Juego[]): Observable<any> {
    const usuarioId = this.obtenerUsuarioDeSesion();
    if (!usuarioId) return throwError(() => new Error('No hay usuario logueado'));

    const juegosIds = juegos.map(j => j.id); // siempre enviamos un array
    return this.http.post(`${environment.BACKEND_URL}/usuario-juego/agregar`, {
      usuarioId,
      juegos: juegosIds
    });
  }
}

export type { Usuario };
