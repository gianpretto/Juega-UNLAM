import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';

import { JuegoComponentDetalle } from './modules/juego/pages/juego-component/juego-component';
import { ListJuegosComponent } from './modules/juegos/pages/list-juegos/list-juegos';
import { CatalogoJuegosComponent } from './modules/juegos/pages/catalogo-juegos/catalogo-juegos';
import { MiBibliotecaComponent } from './modules/juegos/pages/mi-biblioteca/mi-biblioteca';
import { JuegoComponent } from './modules/juego/juego-component/juego-component';
import { RegistroComponent } from './modules/registro/registro.component';
import { IniciarSesionComponent } from './modules/iniciar-sesion/iniciar-sesion.component';
import { UsuarioPerfilComponent } from './modules/usuario-perfil/usuario-perfil.component';
import { WishlistComponent } from './modules/wishlist/wishlist.component';

export const routes: Routes = [
    {
        path: '',
        component : HomeComponent
    },
    {
        path: 'juego/:id',
        component : JuegoComponentDetalle
    },
    {
        path: '**',
        redirectTo: ''
    },
    {
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full'
    },
    {
      path: 'catalogo',
      component: CatalogoJuegosComponent
    },
    {
      path: 'mi-biblioteca',
      component: MiBibliotecaComponent
    },
    {
      path: 'biblioteca',
      component: ListJuegosComponent
    },
    {
      path: '**',
      redirectTo: 'catalogo'
    },
    { path: '', component : HomeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'juego', component : JuegoComponent },
    {path: 'iniciar-sesion', component: IniciarSesionComponent},
    {path: 'usuario-perfil',component: UsuarioPerfilComponent},
    {path: 'wishlist', component: WishlistComponent},
    { path: '**', redirectTo: ''}
  ]




