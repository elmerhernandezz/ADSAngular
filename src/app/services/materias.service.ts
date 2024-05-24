import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../utils/endpoints';
import { Materia } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerMaterias(): Observable<any>{
    return this.http.get<Materia[]>(endpoints.obtenerMaterias);
  }
}
