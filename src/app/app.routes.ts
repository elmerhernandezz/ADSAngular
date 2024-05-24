import { Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { GruposComponent } from './grupos/grupos.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';

export const routes: Routes = [
    {path: '', component: ProfesoresComponent, pathMatch: 'full'}, // Ruta por defecto
    {path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes

    {path: '', component: MateriasComponent, pathMatch: 'full'}, // Ruta por defecto
    {path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes

    {path: '', component: GruposComponent, pathMatch: 'full'}, // Ruta por defecto
    {path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes

    {path: '', component: EstudiantesComponent, pathMatch: 'full'}, // Ruta por defecto
    {path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes

    {path: '', component: CarrerasComponent, pathMatch: 'full'}, // Ruta por defecto
    {path: '**', redirectTo: '', pathMatch: 'full'} // Rutas no existentes
];