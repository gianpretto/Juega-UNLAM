import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map, Observable, throwError } from 'rxjs';
import { UsuarioMapper } from '../mapper/usuario.mapper';
import { UsuarioRest } from '../rest/usuario.rest';
import { environment } from '@evironment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  http = inject(HttpClient);

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

  guardarUsuarioEnSesion(id: number) {
    sessionStorage.setItem("idUsuario", id.toString())
  }

  obtenerUsuarioDeSesion(): number | null {
    if (typeof window === 'undefined') {
      // 🚫 Estamos en el servidor (SSR), no hay sessionStorage
      return null;
    }

    const id = sessionStorage.getItem('idUsuario');
    return id ? parseInt(id, 10) : null;
  }

  getSaldoUsuario(): Observable<number> {
    const id = this.obtenerUsuarioDeSesion();
    if (!id) return throwError(() => new Error('No hay usuario logueado'));

    return this.http
      .get<{ saldo: number }>(`${environment.BACKEND_URL}/usuarios/${id}/saldo`)
      .pipe(map(res => res.saldo));
  }

}

export type { Usuario };
