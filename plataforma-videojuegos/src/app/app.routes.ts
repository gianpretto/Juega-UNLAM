import { Routes } from '@angular/router';
import { ListJuegosComponent } from './modules/juegos/pages/list-juegos/list-juegos';
import { CatalogoJuegosComponent } from './modules/juegos/pages/catalogo-juegos/catalogo-juegos';
import { MiBibliotecaComponent } from './modules/juegos/pages/mi-biblioteca/mi-biblioteca';

/**
 * Rutas principales de la aplicación
 *
 * Usamos lazy loading para cargar los módulos solo cuando se necesiten
 * Esto mejora el rendimiento inicial de la aplicación
 */
export const routes: Routes = [
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
];
