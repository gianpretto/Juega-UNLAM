import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Juego } from '../../../../shared/models/juego.model';
@Component({
  selector: 'app-valoraciones-component',
  imports: [CardModule, ButtonModule],
  templateUrl: './valoraciones-component.html',
  styleUrl: './valoraciones-component.css'
})
export class ValoracionesComponent {
      @Input() juego!: Juego;

}
