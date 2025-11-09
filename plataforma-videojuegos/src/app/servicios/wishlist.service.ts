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
    private baseUrl: string = `${environment.BACKEND_URL}/wishlists`;

    getWishlistsByUserId(userId: number): Observable<Wishlist[]> {
        return this.httpClient.get<Wishlist[]>(`${this.baseUrl}/usuarioId/${userId}`);
    }
    añadirAWishlist(juegoID: number): Observable<Wishlist> {
        return this.httpClient.post<Wishlist>(this.baseUrl, juegoID);
    }
    borrarDeLaWishlist(juegoID: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${juegoID}`);
    }
}







