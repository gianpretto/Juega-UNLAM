import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '@servicios/wishlist.service';
import { UsuarioService } from '@servicios/usuario.service';
import { Juego } from '@interfaces/juego.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private wishlistService = inject(WishlistService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  juegos: Juego[] = [];
  loading = true;


  ngOnInit() {
    if (typeof window === 'undefined') {
      this.loading = false;
      return;
    }

    const usuarioId = this.usuarioService.obtenerUsuarioDeSesion();

    if (usuarioId != null) {
      this.cargarWishlist(usuarioId);
    } else {
      this.loading = false;
    }
  }

  private cargarWishlist(usuarioId: number) {
    this.wishlistService.getWishlistsByUserId(usuarioId).subscribe({
      next: (data) => {

        this.juegos = (data || [])
          .map((w: any) => {
            const juego = w.juego ?? w;
            return {
              ...juego,
              imagenes: juego.imagenes?.map((img: any) => img.url) || []
            };
          })
          .filter((j: any): j is Juego => !!j && !!j.nombre);

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  eliminarJuego(juegoId: number) {
    const usuarioId = this.usuarioService.obtenerUsuarioDeSesion();
    if (!usuarioId) return;

    this.wishlistService.borrarDeLaWishlist(juegoId).subscribe({
      next: () => {
        this.juegos = this.juegos.filter((j: Juego) => j.id !== juegoId);
      },
      error: (err) => console.error('❌ Error al eliminar de la wishlist:', err)
    });
  }

  getImageUrl(juego: Juego): string {
    if (juego.mainImagen?.url) {
      return juego.mainImagen.url;
    }
    
    if (juego.imagenes && juego.imagenes.length > 0) {
      return juego.imagenes[0];
    }
    
    return 'assets/images/default.jpg';
  }

  getTotalPrice(): number {
    return this.juegos.reduce((total, juego) => total + (juego.precio || 0), 0);
  }

  navigateToGame(juegoId: number | undefined) {
    if (juegoId) {
      this.router.navigate(['/juego', juegoId]);
    }
  }

  navigateToCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}



