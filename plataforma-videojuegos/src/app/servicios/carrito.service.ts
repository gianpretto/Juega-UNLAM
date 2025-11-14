import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Juego } from '@interfaces/juego.interface';
import { environment } from '@evironment/environment';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carritoSubject = new BehaviorSubject<Juego[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  http = inject(HttpClient);

  cargarCarrito() {
    const usuarioId = sessionStorage.getItem('idUsuario');
    if (!usuarioId) return;

    this.http.get<Juego[]>(`${environment.BACKEND_URL}/carrito/${usuarioId}`)
      .subscribe({
        next: (juegos) => this.carritoSubject.next(juegos),
        error: (err) => console.error('Error al cargar carrito:', err)
      });
  }

  agregarJuego(juego: Juego) {
    const usuarioId = sessionStorage.getItem('idUsuario');
    if (!usuarioId) return;

    //Verificar si ya está en el carrito actual
    const carritoActual = this.carritoSubject.value;
    const yaEnCarrito = carritoActual.some(j => j.id === juego.id);
    if (yaEnCarrito) {
      return false;
    }

    this.http.post<Juego[]>(`${environment.BACKEND_URL}/carrito/${usuarioId}/agregar`, { juegoId: juego.id })
      .subscribe({
        next: (juegos) => this.carritoSubject.next(juegos),
        error: (err) => console.error('Error al agregar al carrito:', err)
      });
    return true;
  }

  eliminarJuego(juego: Juego) {
    const usuarioId = sessionStorage.getItem('idUsuario');
    if (!usuarioId) return;

    //Usamos body porque Express espera recibir el juegoId en el body
    this.http.delete<Juego[]>(`${environment.BACKEND_URL}/carrito/${usuarioId}/eliminar/${juego.id}`)
      .subscribe({
        next: (juegos) => this.carritoSubject.next(juegos),
        error: (err) => console.error('Error al eliminar juego del carrito:', err)
      });
  }

  vaciarCarrito() {
    const usuarioId = sessionStorage.getItem('idUsuario');
    if (!usuarioId) return;

    this.http.delete(`${environment.BACKEND_URL}/carrito/${usuarioId}/vaciar`)
      .subscribe({
        next: () => this.carritoSubject.next([]),
        error: (err) => console.error('Error al vaciar carrito:', err)
      });
  }

  obtenerTotal(): number {
    return this.carritoSubject.value.reduce((sum, j) => sum + j.precio, 0);
  }
}
