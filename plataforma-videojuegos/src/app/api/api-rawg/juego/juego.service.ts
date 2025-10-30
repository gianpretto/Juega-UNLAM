import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { Juego } from "../../../modules/biblioteca/interfaces/juego.interface";
import { FilterOption } from "../../../modules/biblioteca/interfaces/filter-options.interface";

@Injectable({
  providedIn: "root"
})
export class JuegoService {

  private httpClient = inject(HttpClient);

  getJuegos(): Observable<Juego[]> {
    return this.httpClient.get<any>(`${environment.apiUrl}games?key=${environment.rawgApiKey}&page_size=10`)
      .pipe(
        map((response: any) => {
          return response.results;
        })
      );
  }

  getJuegoById(id: number): Observable<Juego> {
    return this.httpClient.get<any>(`${environment.apiUrl}games/${id}?key=${environment.rawgApiKey}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  // ----------------------------
  // MÉTODOS DE SESIÓN
  // ----------------------------

  saveTermInSession(term: string): void {
    if (!term) return; // Evita guardar valores vacíos
    sessionStorage.setItem('searchTerm', term);
  }

  saveGenreInSession(genre: string): void {
    if (!genre) return;
    sessionStorage.setItem('genre', genre);
  }

  savePlatformInSession(platform: string): void {
    if (!platform) return;
    sessionStorage.setItem('platform', platform);
  }

  saveSortInSession(sort: string): void {
    if (!sort) return;
    sessionStorage.setItem('sort', sort);
  }

  // Si no hay sesión, no devuelve nada
  getSessionFilteredGames(): FilterOption[] {
    if (!sessionStorage.length) {
      return []; // ✅ No hay sesión, no devuelve nada
    }

    const term: string = sessionStorage.getItem('searchTerm') || '';
    const genre: string = sessionStorage.getItem('genre') || '';
    const platform: string = sessionStorage.getItem('platform') || '';
    const sort: string = sessionStorage.getItem('sort') || '';

    // Si todos están vacíos, no tiene sentido devolver filtros
    if (!term && !genre && !platform && !sort) {
      return [];
    }

    return [
      { name: "term", value: term },
      { name: "genre", value: genre },
      { name: "platform", value: platform },
      { name: "sort", value: sort }
    ];
  }

  clearFilters(): void {
    if (!sessionStorage.length) return; // ✅ No hay nada que limpiar
    sessionStorage.clear();
  }
}
