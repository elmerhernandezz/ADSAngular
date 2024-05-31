import { Component, OnInit, inject } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { CommonModule } from '@angular/common';
import { Carrera } from '../interfaces/carrera.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.scss'
})
export class CarrerasComponent implements OnInit {
  // Haciendo inyeccion de dependencia
  private readonly carrerasService = inject(CarrerasService);
  private readonly router = inject(Router);
  public lstCarreras: Carrera[];

  constructor(){
    this.lstCarreras = [];
  }

  ngOnInit(): void {
    this.getAllCareers();
  }
    
  getAllCareers(){
    this.carrerasService.obtenerCarreras().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
      // Se asigna la lista al arreglo anteriormente descrito
      this.lstCarreras = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

navigateToForm(){ 
this.router.navigate(['/agregarCarrera']); 
} 

deleteCarrera(event: any){ 
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
    this.carrerasService.eliminarCarrera(event.target.value).subscribe({ 
      // En caso exitoso 
      next: (temp) => { 
        Swal.fire("Eliminado","Registro eliminado con exito","success"); 
        
        this.getAllCareers(); 
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

updateCarrera(valor: number){  
  if(valor){ 
    this.router.navigate(['/agregarCarrera', valor]); 
  } 
} 
}