import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstudiantesService } from './services/estudiantes.service';
import { CarrerasService } from './services/carreras.service';
import { GruposService } from './services/grupos.service';
import { MateriasService } from './services/materias.service';
import { ProfesoresService } from './services/profesores.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GestionAcademica';
  // Haciendo inyeccion de dependencia
  private readonly estudiantesServices = inject(EstudiantesService);
  // Creando observable
  estudiantes$ = this.estudiantesServices.obtenerEstudiantes();
  // Haciendo inyeccion de dependencia
  private readonly carrerasServices = inject(CarrerasService);
  // Creando observable
  carreras$ = this.carrerasServices.obtenerCarreras();
  // Haciendo inyeccion de dependencia
  private readonly gruposServices = inject(GruposService);
  // Creando observable
  grupos$ = this.gruposServices.obtenerGrupos();
  // Haciendo inyeccion de dependencia
  private readonly materiasServices = inject(MateriasService);
  // Creando observable
  materias$ = this.materiasServices.obtenerMaterias();
  // Haciendo inyeccion de dependencia
  private readonly profesoresServices = inject(ProfesoresService);
  // Creando observable
  profesores$ = this.profesoresServices.obtenerProfesores();
}