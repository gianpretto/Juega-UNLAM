import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Juego } from '@interfaces/juego.interface';
import { Review } from '@interfaces/review.interface';
import { JuegoService } from '@servicios/juego.service';
import { BibliotecaService } from '@servicios/biblioteca.service';
import { userInfo } from 'os';  import { UsuarioService } from '@servicios/usuario.service';
@Component({
  selector: 'app-valoraciones-component',
  imports: [CardModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: 'valoraciones-component.html',
  styleUrl: 'valoraciones-component.css'
})
export class ValoracionesComponent implements OnInit {
  juegoComprado: boolean = false;
  nuevaResena: string = '';
  nuevaValoracion: string = '5';
  enviandoResena: boolean = false;
  usuarioService = inject(UsuarioService);
  bibliotecaService = inject(BibliotecaService);
  juegoService = inject(JuegoService);

  @Input() juego!: Juego;

  reviews: Review[] = [];
  mensajeReview: string = '';
  
    ngOnInit(): void {
      this.listarReviews();
       this.verificarJuegoComprado();
       
    }

    listarReviews(){
      this.juegoService.obtenerReviewsDeUnJuego(this.juego.id).subscribe({
        next : (data) => {
          console.log("REVIEWS RECIBIDAS:",data);
          this.reviews = data.map((review: Review) => ({
        ...review,
        expandida: false
      }));
        },
        error : (data) => {
          console.log("ERROR AL TRAER LAS REVIEWS",data);
        },
        complete : () => {
          console.log("REVIEWS TRAIDAS")
        },
      });
    }

    toggleExpand(review: Review) {
    review.expandida = !review.expandida;
    }
     verificarJuegoComprado() {
    this.bibliotecaService.estaComprado(this.juego.id).subscribe({
      next: (comprado) => this.juegoComprado = comprado,
      error: () => this.juegoComprado = false
    });
  }

  enviarResena() {
    if (!this.nuevaResena.trim()) {
      alert('Por favor, escribe una reseña antes de enviar');
      return;
    }

    if (!this.juego.id) {
      alert('Error: No se pudo identificar el juego');
      return;
    }

    this.enviandoResena = true;

    const nuevaReview: any = {
      descripcion: this.nuevaResena,
      juegoId: this.juego.id,
      usuarioId: this.usuarioService.obtenerUsuarioDeSesion() 
    };

    this.juegoService.crearReview(nuevaReview).subscribe({
  next: (review) => {

    this.listarReviews(); 
    this.nuevaResena = ''; 
    this.mensajeReview = "Review cargada correctamente"; 
      
  },
  error: () => {
    this.mensajeReview = "Error al cargar la review";
  },
  complete: () => this.enviandoResena = false
});
  }

}
