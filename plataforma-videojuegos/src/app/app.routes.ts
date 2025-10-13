import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';
import { JuegoComponent } from './modules/juego/juego-component/juego-component';
import { RegistroComponent } from './modules/registro/registro.component';
import { IniciarSesionComponent } from './modules/iniciar-sesion/iniciar-sesion.component';
import { UsuarioPerfilComponent } from './modules/usuario-perfil/usuario-perfil.component';



export const routes: Routes = [
    { path: '', component : HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'juego', component : JuegoComponent },
    {path: 'iniciar-sesion', component: IniciarSesionComponent},
    {path: 'usuario-perfil',component: UsuarioPerfilComponent},
    { path: '**', redirectTo: '' } 
];

