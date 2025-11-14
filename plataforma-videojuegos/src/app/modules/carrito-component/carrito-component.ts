import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CarritoService } from '@servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { Juego } from '@interfaces/juego.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-component.html',
  styleUrl: './carrito-component.css'
})
export class CarritoComponent implements OnInit {
  juegos: Juego[] = [];
  total: number = 0;
  mostrarCarrito = false;

  carritoService = inject(CarritoService);
  router = inject(Router);

  ngOnInit() {
    this.carritoService.cargarCarrito();
    this.carritoService.carrito$.subscribe(juegos => {
      this.juegos = juegos;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  eliminar(juego: Juego) {
    this.carritoService.eliminarJuego(juego);
  }

  irAPedido() {
    this.router.navigate(['/pedido']);
  }
}