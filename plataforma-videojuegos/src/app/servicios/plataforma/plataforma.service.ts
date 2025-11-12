import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@evironment/environment';
import { Plataforma } from '@interfaces/plataforma.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
  private httpClient = inject(HttpClient);

  obtenerPlataformas():Observable<Plataforma[]>{
    return this.httpClient.get<Plataforma[]>(`${environment.BACKEND_URL}/plataforma/`)
  }
}
