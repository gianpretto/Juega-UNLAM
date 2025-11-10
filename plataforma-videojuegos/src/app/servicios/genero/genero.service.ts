import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@evironment/environment';
import { Genero } from '@interfaces/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  
  private httpClient = inject(HttpClient);

  obtenerGeneros():Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(`${environment.BACKEND_URL}/genero/`)
  }
}
