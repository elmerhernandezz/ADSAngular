import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../utils/endpoints';
import { Grupo } from '../interfaces/grupo.interface';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerGrupos(): Observable<any>{
    return this.http.get<Grupo[]>(endpoints.obtenerGrupos);
  }
}
