import { JuegoPlataforma } from '@interfaces/juego-plataforma.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@evironment/environment';

@Injectable({
  providedIn: 'root'
})
export class JuegoPlataformaService {
  private httpClient = inject(HttpClient);

  obtenerJuegosPlataformas():Observable<JuegoPlataforma[]>{
    return this.httpClient.get<JuegoPlataforma[]>(`${environment.BACKEND_URL}/plataforma/`)
  }
}
