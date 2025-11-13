
import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { JuegoService } from '@general/servicios/juego.service';
import { CarritoService } from '@servicios/carrito.service';
import { WishlistService } from '@general/servicios/wishlist.service';
import { BibliotecaService } from '@general/servicios/biblioteca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-component',
  standalone: true,
  imports: [ButtonModule, CurrencyPipe, CommonModule],
  templateUrl: './opciones-component.html',
  styleUrl: './opciones-component.css'
})


export class OpcionesComponent implements OnInit {
  juegoComprado: boolean = false;

  ngOnInit(): void {
    this.obtenerImagenDePortada();
    this.verificarJuegoComprado();
  }

  @Input() juego!: Juego;

  constructor(private wishlistService: WishlistService, private bibliotecaService: BibliotecaService,  private router: Router) { }

  carritoService = inject(CarritoService);


  imagen: string = '';

  juegoService = inject(JuegoService);

  obtenerImagenDePortada() {
    this.juegoService.obtenerImagenesDeUnJuego(this.juego.id).subscribe({
      next: (data) => {
        this.imagen = data[0].url;
      },
      error: (data) => {
        console.log("COMPONENTE OPCIONES NO PUDO OBTENER LA IMAGEN")
      }
    })
  }


  agregarAWishlist(juegoId: number) {
    if (!juegoId) {
      console.warn('⚠️ No se pudo agregar a la wishlist: juegoId indefinido');
      return;
    }
    if (!this.juegoComprado) {
      this.wishlistService.añadirAWishlist(juegoId).subscribe({
        next: (data) => {
          console.log('Juego agregado a la wishlist:', data);
        },
        error: (error) => {
          alert('El juego ya está en tu wishlist');
        }
      });
    }
  }
  agregarAlCarrito() {
    if (!this.juegoComprado) this.carritoService.agregarJuego(this.juego);
  }
  verificarJuegoComprado() {
    this.bibliotecaService.estaComprado(this.juego.id).subscribe({
      next: (comprado) => this.juegoComprado = comprado,
      error: () => this.juegoComprado = false
    });
  }

  irABiblioteca() {
  this.router.navigate(['/mi-biblioteca']);
}
}