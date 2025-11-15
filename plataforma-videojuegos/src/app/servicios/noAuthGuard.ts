import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const id = this.usuarioService.obtenerUsuarioDeSesion(); 
    if (!id) return true;
    return this.router.createUrlTree(['/catalogo']);
  }
}