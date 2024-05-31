import { Component, OnInit, inject } from '@angular/core';
import { ProfesoresService } from '../services/profesores.service';
import { CommonModule } from '@angular/common';
import { Profesor } from '../interfaces/profesor.interface';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2'; 
import { parsearErroresAPI } from '../utils/Utilities'; 

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.scss'
})
export class ProfesoresComponent implements OnInit{
  // Haciendo inyeccion de dependencia
  private readonly profesoresService = inject(ProfesoresService);
  private readonly router = inject(Router); 
  public lstProfesores: Profesor[];

  constructor(){
    this.lstProfesores = [];
  }

  ngOnInit(): void {
    this.getAllTeachers();
  }
  getAllTeachers(){
    this.profesoresService.obtenerProfesores().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
      // Se asigna la lista al arreglo anteriormente descrito
      this.lstProfesores = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }
  // Metodo que permite navegar al formulario para insertar estudiantes 
navigateToForm(){ 
this.router.navigate(['/agregarProfesor']); 
} 

// Eliminar un estudiante 
deleteProfesor(event: any){ 
Swal.fire({ 
  title: "¿Quiere eliminar este registro?", 
  text: "Esta acción no se puede revertir", 
  icon: "warning", 
  showCancelButton: true, 
  confirmButtonColor: "#3085d6", 
  cancelButtonColor: "#d33", 
  confirmButtonText: "Sí, eliminar", 
  cancelButtonText: "Cancelar", 
  showLoaderOnConfirm: true 
}).then((result) => { 
  if (result.isConfirmed){ 
    this.profesoresService.eliminarProfesor(event.target.value).subscribe({ 
      // En caso exitoso 
      next: (temp) => { 
        Swal.fire("Eliminado","Registro eliminado con exito","success"); 
        // Refrescamos la lista de estudiantes 
        this.getAllTeachers(); 
      }, 
      // En caso erroneo 
      error: (err) => { 
        Swal.fire({ 
          icon: 'error', 
          title: 'Error al eliminar', 
          text: parsearErroresAPI(err).toString() 
        }); 
      } 
    }); 
  } 
}); 
} 

/** 
* Metodo que permite viajar al componente para agregar un estudiante (pero en 
modo edicion). 
  */ 
updateProfesor(valor: number){ 
    // Viajando al componente agregar estudiante 
    // Primero se valida que exista un valor (es decir que sea distinto de nulo) 
    if(valor){ 
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej. 
//agregarEstudiante/3 
      this.router.navigate(['/agregarProfesor', valor]); 
    } 
  }
}
