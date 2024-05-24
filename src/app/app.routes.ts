import { Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { GruposComponent } from './grupos/grupos.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';

export const routes: Routes = [
    { path: '', component: EstudiantesComponent, pathMatch: 'full' }, // Ruta por defecto
    { path: 'materias', component: MateriasComponent },
    { path: 'grupos', component: GruposComponent },
    { path: 'carreras', component: CarrerasComponent },
    { path: 'profesores', component: ProfesoresComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Rutas no existentes
];