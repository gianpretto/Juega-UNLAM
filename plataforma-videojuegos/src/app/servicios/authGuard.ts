import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const logged = await firstValueFrom(this.usuarioService.isLoggedIn$);
    if (logged) return true;
    return this.router.createUrlTree(['/iniciar-sesion'], { queryParams: { returnUrl: state.url } });
  }
}