import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';
import { CatalogoJuegosComponent } from '@modules/catalogo-juegos/catalogo-juegos';
import { MiBibliotecaComponent } from '@modules/biblioteca/mi-biblioteca';
import { RegistroComponent } from '@modules/registro/registro.component';
import { IniciarSesionComponent } from '@modules/iniciar-sesion/iniciar-sesion.component';
import { UsuarioPerfilComponent } from '@modules/usuario-perfil/usuario-perfil.component';
import { WishlistComponent } from '@modules/wishlist/wishlist.component';
import { JuegoComponent } from '@modules/juego/juego-component';
import { PedidoComponent } from './modules/pedido-component/pedido-component';
import { AuthGuard } from './servicios/authGuard';
import { InicioComponent } from '@general/modules/inicio-component/inicio.component';
import { NoAuthGuard } from './servicios/noAuthGuard';

export const routes: Routes = [
      {
        path: '', 
        component: InicioComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'home',
        component : HomeComponent,
        data: { title: 'Inicio'}
    },
    
    {
        path: 'juego/:id',
        component : JuegoComponent,
      canActivate: [AuthGuard]
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
      path: 'catalogo',
      component: CatalogoJuegosComponent,
      canActivate: [AuthGuard]

    },
    {
      path: 'mi-biblioteca',
      component: MiBibliotecaComponent,
      canActivate: [AuthGuard]
          },
    {
      path: 'registro',
      component: RegistroComponent,
      canActivate: [NoAuthGuard]

    },
    {
      path: 'iniciar-sesion',
      component: IniciarSesionComponent,
      canActivate: [NoAuthGuard]

    },
    {
      path: 'usuario-perfil',
      component: UsuarioPerfilComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'wishlist',
      component: WishlistComponent,
      canActivate: [AuthGuard]

    },
    {
      path: 'pedido',
      component: PedidoComponent,
      canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'home'
    },

  ]




