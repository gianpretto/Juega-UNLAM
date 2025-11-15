import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '@servicios/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  apellido = '';
  email = '';
  direccion = '';
  password = '';

  mensajeError: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}
  mostrarError(msg: string) {
  this.mensajeError = msg;

  setTimeout(() => {
    this.mensajeError = '';
  }, 10000);
}

 onSubmit() {

 

  this.usuarioService.createUsuario({
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    direccion: this.direccion,
    password: this.password
  }).subscribe({
    next: () => {
      this.router.navigate(['/iniciar-sesion']);
    },
    error: (err) => {
  const mensajes = err.error?.errors?.join(', ') || err.error?.message || "Error al registrar usuario";
    this.mostrarError(mensajes);

    }
  });
}

}



