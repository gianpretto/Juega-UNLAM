import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  email = '';
  contrasena = '';

  onSubmit() {
    console.log('Inicio de sesión:', {
      email: this.email,
      contraseña: this.contrasena
    });
  }

}
