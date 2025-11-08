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

  constructor() {}


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


}
export type { Usuario };