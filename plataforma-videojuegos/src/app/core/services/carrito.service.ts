import { Injectable } from '@angular/core';
import { Juego } from '../../shared/models/juego.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private juegos: Juego[] = [];
  private carritoSubject = new BehaviorSubject<Juego[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  agregarJuego(juego: Juego) {
    this.juegos.push(juego);
    this.carritoSubject.next(this.juegos);
  }

  eliminarJuego(juego: Juego) {
    console.log('Eliminando id:', juego);
    console.log('Antes:', this.juegos);
    this.juegos = this.juegos.filter(j => j !== juego);
    console.log('Después:', this.juegos);
    this.carritoSubject.next([...this.juegos]);
  }

  obtenerTotal(): number {
    return this.juegos.reduce((sum, j) => sum + j.precio, 0);
  }

  vaciarCarrito() {
    this.juegos = [];
    this.carritoSubject.next([]);
  }
}
