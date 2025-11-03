import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';
import { CatalogoJuegosComponent } from '@modules/catalogo-juegos/catalogo-juegos';
import { MiBibliotecaComponent } from '@modules/biblioteca/mi-biblioteca';
import { RegistroComponent } from '@modules/registro/registro.component';
import { IniciarSesionComponent } from '@modules/iniciar-sesion/iniciar-sesion.component';
import { UsuarioPerfilComponent } from '@modules/usuario-perfil/usuario-perfil.component';
import { WishlistComponent } from '@modules/wishlist/wishlist.component';
import { JuegoComponent } from '@modules/juego/juego-component';

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
        component : JuegoComponent
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




