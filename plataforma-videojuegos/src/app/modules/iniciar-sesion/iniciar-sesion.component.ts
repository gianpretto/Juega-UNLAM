import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  email = '';
  password = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

   irARegistro() {
    this.router.navigate(['/registro']);
  }


  onSubmit() {
    this.usuarioService.loginUsuario(this.email, this.password)
      .subscribe({
        next: (res) => {
          console.log('Sesión iniciada:', res);
          // 🔹 Redirigir al catálogo
          this.router.navigate(['/catalogo']);
        },
        error: (err) => console.error('Error al iniciar sesión:', err)
      });
  }
}
