import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../utils/endpoints';
import { Profesor } from '../interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerProfesores(): Observable<any>{
    return this.http.get<Profesor[]>(endpoints.obtenerProfesores);
  }
}
