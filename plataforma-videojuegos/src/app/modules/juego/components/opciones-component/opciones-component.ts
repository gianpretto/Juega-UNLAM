
import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { JuegoService } from '@general/servicios/juego.service';
import { CarritoService } from '@servicios/carrito.service';
import { WishlistService } from '@general/servicios/wishlist.service';


@Component({
  selector: 'app-opciones-component',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './opciones-component.html',
  styleUrl: './opciones-component.css'
})


export class OpcionesComponent implements OnInit {

  ngOnInit(): void {
    this.obtenerImagenDePortada();
  }

  @Input() juego!: Juego;

  constructor(private wishlistService: WishlistService) {}


  carritoService = inject(CarritoService);


  imagen:string = '';

  juegoService = inject(JuegoService);

  obtenerImagenDePortada(){
    this.juegoService.obtenerImagenesDeUnJuego(this.juego.id).subscribe({
      next : (data) => {
        this.imagen = data[0].url;
      },
      error : (data) => {
        console.log("COMPONENTE OPCIONES NO PUDO OBTENER LA IMAGEN")
      }
    })
  }


  agregarAWishlist(juegoId: number) {
    if (!juegoId) {
      console.warn('⚠️ No se pudo agregar a la wishlist: juegoId indefinido');
      return;
    }

    this.wishlistService.añadirAWishlist(juegoId).subscribe({
      next: (data) => {
        console.log('Juego agregado a la wishlist:', data);
      },
      error: (error) => {
        alert('El juego ya está en tu wishlist');
      }
    });
  }

  agregarAlCarrito() {
    this.carritoService.agregarJuego(this.juego);
  }

}