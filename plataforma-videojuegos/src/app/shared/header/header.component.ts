import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  readonly currentUser$;
  mobileMenuOpen = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.currentUser$ = this.usuarioService.currentUser$;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  salir() {
    this.usuarioService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/iniciar-sesion']);
  }
}
