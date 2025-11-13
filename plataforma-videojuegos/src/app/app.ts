import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('plataforma-videojuegos');
  readonly isLoggedIn$;

  constructor(private usuarioService: UsuarioService) {
    this.isLoggedIn$ = this.usuarioService.isLoggedIn$;
    // inicializar estado y restaurar usuario completo desde sessionStorage (SSR-safe dentro del servicio)
    this.usuarioService.restoreFromSession();
  }
}
