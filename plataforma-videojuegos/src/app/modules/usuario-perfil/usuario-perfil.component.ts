import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { Usuario } from '@interfaces/usuario.interface';
import { UsuarioService } from '@servicios/usuario.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FileUploadModule, CardModule, AvatarModule],
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent {


   imagenPerfil: string | ArrayBuffer | null = 'https://www.w3schools.com/howto/img_avatar.png';
  imagenFondo: string | ArrayBuffer | null = '';
mensaje: string = '';

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);


  usuario: Usuario | null = null;
  
ngOnInit() {
  const usuarioId = this.usuarioService.obtenerUsuarioDeSesion();
  if (!usuarioId) return;

  this.usuarioService.verUsuario(usuarioId).subscribe({
    next: (data) => {
      this.usuario = data;
      this.imagenPerfil = data.perfilUrl || 'https://www.w3schools.com/howto/img_avatar.png';
      this.imagenFondo = data.fondoPerfilUrl || '';
    },
    error: (error) => {
      console.error('Error al obtener datos del usuario:', error);
    }
  });
}

onPerfilUpload(event: any) {
  const file = event.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const usuarioId = this.usuarioService.obtenerUsuarioDeSesion();
    if (!usuarioId) return;

    const perfilUrl = reader.result?.toString() || null;
    const fondoPerfilUrl = this.imagenFondo?.toString() || null;

    this.usuarioService.actualizarImagenes(usuarioId, { perfilUrl, fondoPerfilUrl })
      .subscribe({
        next: () => {
          this.imagenPerfil = perfilUrl;
          this.mostrarMensaje('¡Foto de perfil actualizada!');
        },
        error: () => {
          this.mostrarMensaje('Error al actualizar foto de perfil');
        }
      });
  };

  reader.readAsDataURL(file);
}

onFondoUpload(event: any) {
  const file = event.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const usuarioId = this.usuarioService.obtenerUsuarioDeSesion();
    if (!usuarioId) return;

    const fondoPerfilUrl = reader.result?.toString() || null;
    const perfilUrl = this.imagenPerfil?.toString() || null;

    this.usuarioService.actualizarImagenes(usuarioId, { perfilUrl, fondoPerfilUrl })
      .subscribe({
        next: () => {
          this.imagenFondo = fondoPerfilUrl;
          this.mostrarMensaje('¡Fondo de perfil actualizado!');
        },
        error: () => {
          this.mostrarMensaje('Error al actualizar el fondo');
        }
      });
  };

  reader.readAsDataURL(file);
}


mostrarMensaje(texto: string) {
  this.mensaje = texto;

  setTimeout(() => {
    this.mensaje = '';
  }, 2500);
}
  navigateToCatalogo() {
    this.router.navigate(['/catalogo']);

  }



}

