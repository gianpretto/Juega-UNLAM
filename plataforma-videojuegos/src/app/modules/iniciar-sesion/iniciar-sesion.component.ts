import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  email = '';
  password = '';
  mensajeError: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  onSubmit() {
    
    this.usuarioService.loginUsuario(this.email, this.password)
      .subscribe({
        next: (res) => {
          this.usuarioService.setCurrentUser(res);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const mensajes = err.error?.errors?.join(', ') || "Error al iniciar sesión";
          this.mensajeError = mensajes;
          setTimeout(() => this.mensajeError = '', 2000);
        }
      });
  }
}
