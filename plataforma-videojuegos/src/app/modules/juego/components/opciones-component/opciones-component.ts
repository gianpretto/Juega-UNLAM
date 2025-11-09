import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '@general/servicios/wishlist.service';

@Component({
  selector: 'app-opciones-component',
  imports: [ButtonModule,CurrencyPipe],
  templateUrl: './opciones-component.html',
  styleUrl: './opciones-component.css'
})
export class OpcionesComponent {

  constructor(private wishlistService: WishlistService) {}

  agregarAWishlist(juegoId: number) {
    this.wishlistService.añadirAWishlist(juegoId).subscribe({
      next: (data) => {
        console.log('Juego agregado a la wishlist:', data);
      },
      error: (error) => {
        console.error('Error al agregar el juego a la wishlist:', error);
      }
    });
  }


  @Input() juego!: Juego;

}
