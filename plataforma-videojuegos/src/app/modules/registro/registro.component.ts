import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
  contrasena  = '';

  onSubmit() {
    console.log('Usuario registrado:', {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      direccion: this.direccion,
      contraseña: this.contrasena 
    });
  }
}

