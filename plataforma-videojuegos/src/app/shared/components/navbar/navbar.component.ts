import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, InputTextModule, ButtonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  q = '';
  items = [
    { label: 'Inicio', routerLink: '/home' },
    { label: 'Catálogo', routerLink: '/catalogo' },
    { label: 'Mi biblioteca', routerLink: '/mi-biblioteca' },
    { label: 'Wishlist', routerLink: '/wishlist' }
  ];
  constructor(private router: Router) {}
  goSearch() {
    this.router.navigate(['/catalogo'], { queryParams: { q: this.q } });
  }
}