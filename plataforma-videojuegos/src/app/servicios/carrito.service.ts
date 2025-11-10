import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Juego } from '@interfaces/juego.interface';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private juegos: Juego[] = [];
  private carritoSubject = new BehaviorSubject<Juego[]>([]);
  carrito$ = this.carritoSubject.asObservable();
  private esNavegador: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.esNavegador = isPlatformBrowser(this.platformId);

    if (this.esNavegador) {  // 👈 solo en navegador
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.juegos = JSON.parse(carritoGuardado);
        this.carritoSubject.next(this.juegos);
      }
    }
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.juegos));
  }

  agregarJuego(juego: Juego) {
    // Verifica si ya existe en el carrito
    const yaExiste = this.juegos.some(j => j.id === juego.id); // ✅ comparar por id

    if (!yaExiste) {
      this.juegos.push(juego);
      this.carritoSubject.next([...this.juegos]);
      this.guardarEnLocalStorage();
    } else {
      console.warn(`El juego "${juego.nombre}" ya está en el carrito.`);
    }
  }

  eliminarJuego(juego: Juego) {
    this.juegos = this.juegos.filter(j => j.id !== juego.id); // ✅ eliminar por id
    this.carritoSubject.next([...this.juegos]);
    this.guardarEnLocalStorage();
  }

  obtenerTotal(): number {
    return this.juegos.reduce((sum, j) => sum + j.precio, 0);
  }

  vaciarCarrito() {
    this.juegos = [];
    this.carritoSubject.next([]);
    this.guardarEnLocalStorage();
  }
}
