import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Juego } from "../../../modules/juegos/interfaces/juego.interface";


@Injectable({
  providedIn: "root"
})
export class JuegoService {

private httpClient = inject(HttpClient);


getJuegos():Observable<Juego[]>{
  return this.httpClient.get<any>(`${environment.apiUrl}games?key=${environment.rawgApiKey}&page_size=10`)
  .pipe(
    map((response: any) =>{
      console.log('📦 Respuesta completa:', response);
      console.log('🎮 Solo results:', response.results);
      console.log('🔢 Tipo de results:', Array.isArray(response.results));
       return response.results
      })
  )
}

getJuegoById(id: number):Observable<Juego>{
    return this.httpClient.get<any>(`${environment.apiUrl}games/${id}?key=${environment.rawgApiKey}`)
    .pipe(
      map((response: any) =>{
        return response
      })
    )
  }


}
