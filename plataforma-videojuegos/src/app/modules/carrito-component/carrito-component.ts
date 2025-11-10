import { Component, NgModule, OnInit } from '@angular/core';
import { CarritoService } from '@servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { Juego } from '@interfaces/juego.interface';

@Component({
  selector: 'app-carrito-component',
  imports: [CommonModule],
  templateUrl: './carrito-component.html',
  styleUrl: './carrito-component.css'
})
export class CarritoComponent implements OnInit {
  juegos: Juego[] = [];
  total: number = 0;
  mostrarCarrito = false;

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
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
}