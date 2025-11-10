import { Juego } from '@interfaces/juego.interface';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '@general/servicios/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-component.html',
  styleUrl: './pedido-component.css'
})
export class PedidoComponent implements OnInit {
  juegos: Juego[] = [];
  total = 0;
  saldoUsuario = 15000; // 💵 Ejemplo de saldo, después podés traerlo del backend o usuario logueado
  mensaje = '';
  carritoService = inject(CarritoService);
  router = inject(Router);

  ngOnInit() {
    this.carritoService.carrito$.subscribe(juegos => {
      this.juegos = juegos;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  irACatalogo() {
    this.router.navigate(['/catalogo']);
  }

  confirmarCompra() {
    if (this.juegos.length === 0) {
      this.mensaje = 'Tu carrito está vacío.';
      return;
    }

    if (this.total > this.saldoUsuario) {
      this.mensaje = 'Saldo insuficiente para realizar la compra.';
      return;
    }

    // Simula compra exitosa
    this.saldoUsuario -= this.total;
    this.carritoService.vaciarCarrito();
    this.total = 0;
    this.juegos = [];
    this.mensaje = '🎉 ¡Compra realizada con éxito!';
  }
}