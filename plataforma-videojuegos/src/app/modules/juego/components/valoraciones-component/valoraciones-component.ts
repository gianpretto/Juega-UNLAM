import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Juego } from '@interfaces/juego.interface';
import { Review } from '@interfaces/review.interface';
import { JuegoService } from '@servicios/juego.service';
@Component({
  selector: 'app-valoraciones-component',
  imports: [CardModule, ButtonModule],
  templateUrl: './valoraciones-component.html',
  styleUrl: './valoraciones-component.css'
})
export class ValoracionesComponent implements OnInit {

    juegoService = inject(JuegoService);

    @Input() juego!: Juego;

    reviews: Review[] = [];
    
    ngOnInit(): void {
      this.listarReviews();
    }

    listarReviews(){
      this.juegoService.obtenerReviewsDeUnJuego(this.juego.id).subscribe({
      next : (data) => {
        this.reviews = data.map((review) => ({
          ...review,
          expandida: false
        })) as Review[];
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

}
