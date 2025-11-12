import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '@servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  apellido = '';
  email = '';
  direccion = '';
  password  = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

 onSubmit() {
  this.usuarioService.createUsuario({
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    direccion: this.direccion,
    password: this.password
  }).subscribe({
    next: (res) => {
      console.log('Usuario registrado', res);
                this.router.navigate(['/iniciar-sesion']);

    },
    error: (err) => {
      alert(err.error.message); 
    }
  });
}
}


