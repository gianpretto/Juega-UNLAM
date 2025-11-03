import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';

import { JuegoComponentDetalle } from './modules/juego/pages/juego-component/juego-component';
import { CatalogoJuegosComponent } from './modules/biblioteca/pages/catalogo-juegos/catalogo-juegos';
import { MiBibliotecaComponent } from './modules/biblioteca/pages/mi-biblioteca/mi-biblioteca';
import { RegistroComponent } from './modules/registro/registro.component';
import { IniciarSesionComponent } from './modules/iniciar-sesion/iniciar-sesion.component';
import { UsuarioPerfilComponent } from './modules/usuario-perfil/usuario-perfil.component';
import { WishlistComponent } from './modules/wishlist/wishlist.component';

export const routes: Routes = [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component : HomeComponent,
        data: { title: 'Inicio'}
    },
    {
        path: 'juego/:id',
        component : JuegoComponentDetalle
    },
    {
      path: 'catalogo',
      component: CatalogoJuegosComponent,
      data: { title: 'Catálogo' }
    },
    {
      path: 'mi-biblioteca',
      component: MiBibliotecaComponent
    },
    {
      path: 'registro',
      component: RegistroComponent
    },
    {
      path: 'iniciar-sesion',
      component: IniciarSesionComponent
    },
    {
      path: 'usuario-perfil',
      component: UsuarioPerfilComponent
    },
    {
      path: 'wishlist',
      component: WishlistComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    },

  ]




