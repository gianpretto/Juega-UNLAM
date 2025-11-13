import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio.component',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
    irARegistro() {
    this.router.navigate(['/registro']);
  }

  irALogin() {
    this.router.navigate(['/iniciar-sesion']);
  }
}
