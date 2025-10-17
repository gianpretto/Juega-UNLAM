import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';


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

    onPerfilUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.imagenPerfil = event.target?.result || null;
    };

    reader.readAsDataURL(file);
  }

  
  onFondoUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.imagenFondo = event.target?.result || null;
    };
    reader.readAsDataURL(file);
}

}

