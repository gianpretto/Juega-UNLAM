import { Routes } from '@angular/router';
import { ListJuegosComponent } from './modules/juegos/pages/list-juegos/list-juegos';

/**
 * Rutas principales de la aplicación
 *
 * Usamos lazy loading para cargar los módulos solo cuando se necesiten
 * Esto mejora el rendimiento inicial de la aplicación
 */
export const routes: Routes = [
  {
    path: '',
    component: ListJuegosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
