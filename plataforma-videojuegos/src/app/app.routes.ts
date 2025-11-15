import { Routes } from '@angular/router';
import { AuthGuard } from './servicios/authGuard';
import { InicioComponent } from '@general/modules/inicio-component/inicio.component';
import { NoAuthGuard } from './servicios/noAuthGuard';

export const routes: Routes = [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
    path: 'inicio', 
    component: InicioComponent,
    canActivate: [NoAuthGuard]
    },
    {
        path: 'home',
        loadComponent: () => import('@modules/home-component/home-component')
        .then(c => c.HomeComponent)
    },
    {
        path: 'juego/:id',
        loadComponent: () => import('@modules/juego/juego-component')
        .then(c => c.JuegoComponent),
      canActivate: [AuthGuard]
    },
    {
      path: 'catalogo',
      loadComponent: () => import('@modules/catalogo-juegos/catalogo-juegos')
      .then(c => c.CatalogoJuegosComponent),
      canActivate: [AuthGuard]
    },
    {
      path: 'mi-biblioteca',
      loadComponent: () => import('@modules/biblioteca/mi-biblioteca')
      .then(c => c.MiBibliotecaComponent),
      canActivate: [AuthGuard]
    },
    {
      path: 'registro',
      loadComponent: () => import('@modules/registro/registro.component').then(c => c.RegistroComponent),
      canActivate: [NoAuthGuard]
    },
    {
      path: 'iniciar-sesion',
      loadComponent: () => import('@modules/iniciar-sesion/iniciar-sesion.component').then(c => c.IniciarSesionComponent),
      canActivate: [NoAuthGuard]
    },
    {
      path: 'usuario-perfil',
      loadComponent: () => import('@modules/usuario-perfil/usuario-perfil.component').then(c => c.UsuarioPerfilComponent),
      canActivate: [AuthGuard]
    },
    {
      path: 'wishlist',
      loadComponent: () => import('@modules/wishlist/wishlist.component').then(c => c.WishlistComponent),
      canActivate: [AuthGuard]
    },
    {
      path: 'pedido',
      loadComponent: () => import('@modules/pedido-component/pedido-component').then(c => c.PedidoComponent),
      canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'home'
    },
  ]




