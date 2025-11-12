import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Wishlist } from '@general/models/wishlist.model';
import { Observable } from 'rxjs';
import { environment } from '@evironment/environment';
import { Juego } from '@general/models';    



@Injectable({
  providedIn: 'root',
})

export class WishlistService {
    private httpClient = inject(HttpClient);
    private baseUrl: string = `${environment.BACKEND_URL}/wishlist`;

    getWishlistsByUserId(userId: number): Observable<Wishlist[]> {
        return this.httpClient.get<Wishlist[]>(`${this.baseUrl}/${userId}`);
    }
   añadirAWishlist(juegoID: number): Observable<Wishlist> {
    const usuarioId = sessionStorage.getItem('idUsuario');
    if (!usuarioId) {
        throw new Error('Usuario no autenticado');
    }

    const body = { usuarioId: parseInt(usuarioId, 10), juegoId: juegoID };
    
    return this.httpClient.post<Wishlist>(this.baseUrl, body); 
}
    borrarDeLaWishlist(juegoID: number): Observable<void> {
        const usuarioId = sessionStorage.getItem('idUsuario');
        if (!usuarioId) {
            throw new Error('Usuario no autenticado');
        }
        return this.httpClient.delete<void>(`${this.baseUrl}/${usuarioId}/${juegoID}`);
    }
}







