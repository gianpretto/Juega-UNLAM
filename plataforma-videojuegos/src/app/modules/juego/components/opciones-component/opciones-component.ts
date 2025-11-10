import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '@servicios/carrito.service';
import { WishlistService } from '@general/servicios/wishlist.service';

@Component({
  selector: 'app-opciones-component',
  standalone: true,
  imports: [ButtonModule, CurrencyPipe],
  templateUrl: './opciones-component.html',
  styleUrl: './opciones-component.css'
})
export class OpcionesComponent {

  @Input() juego!: Juego;

  wishlistService = inject(WishlistService);
  carritoService = inject(CarritoService);

  agregarAWishlist(juegoId: number) {
    if (!juegoId) {
      console.warn('⚠️ No se pudo agregar a la wishlist: juegoId indefinido');
      return;
    } this.wishlistService.añadirAWishlist(juegoId).subscribe({
      next: (data) => {
        console.log('Juego agregado a la wishlist:', data);
      },
      error: (error) => {
        alert('El juego ya está en tu wishlist');
      }
    })
  };

  agregarAlCarrito() {
    this.carritoService.agregarJuego(this.juego);
  }

}