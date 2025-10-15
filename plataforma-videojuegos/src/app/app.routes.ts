import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component';
import { JuegoComponent } from './modules/juego/pages/juego-component/juego-component';

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
    }
];
