import { Juego } from '@interfaces/juego.interface';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '@general/servicios/carrito.service';
import { Router } from '@angular/router';
import { UsuarioService } from '@general/servicios/usuario.service';

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
  saldoUsuario: number = 0;
  mensaje = '';
  carritoService = inject(CarritoService);
  router = inject(Router);
  usuarioService = inject(UsuarioService);

  ngOnInit() {
    this.carritoService.carrito$.subscribe(juegos => {
      this.juegos = juegos;
      this.total = this.carritoService.obtenerTotal();
    });
    // Traer saldo del usuario
    this.usuarioService.getSaldoUsuario().subscribe({
      next: (saldo) => this.saldoUsuario = saldo,
      error: () => this.mensaje = 'No se pudo obtener el saldo del usuario.'
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

    this.usuarioService.actualizarSaldoUsuario(this.total).subscribe({
      next: () => {
        this.saldoUsuario -= this.total;

        // Registrar los juegos comprados (uno o varios)
        this.usuarioService.registrarJuegos(this.juegos).subscribe({
          next: () => {
            this.carritoService.vaciarCarrito();
            this.total = 0;
            this.juegos = [];
            this.mensaje = '¡Compra realizada con éxito!';
          },
          error: () => this.mensaje = 'Error al registrar la compra'
        });
      },
      error: () => this.mensaje = 'Error al procesar la compra.'
    });
  }
}