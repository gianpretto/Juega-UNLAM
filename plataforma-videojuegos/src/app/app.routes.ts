import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';
import { JuegoComponent } from './modules/juego/pages/juego-component/juego-component';
import { ListJuegosComponent } from './modules/juegos/pages/list-juegos/list-juegos';
import { CatalogoJuegosComponent } from './modules/juegos/pages/catalogo-juegos/catalogo-juegos';
import { MiBibliotecaComponent } from './modules/juegos/pages/mi-biblioteca/mi-biblioteca';

export const routes: Routes = [
    {
        path: '',
        component : HomeComponent
    },
    {
        path: 'juego/:id',
        component : JuegoComponent
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
    }
  ]

