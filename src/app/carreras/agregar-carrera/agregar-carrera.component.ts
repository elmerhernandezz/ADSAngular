import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from 
'@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { Subscription } from 'rxjs'; 
import Swal from 'sweetalert2'; 
import { Carrera } from '../../interfaces/carrera.interface'; 
import { CarrerasService } from '../../services/carreras.service'; 
import { parsearErroresAPI } from '../../utils/Utilities'; 
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-agregar-carrera',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-carrera.component.html',
  styleUrl: './agregar-carrera.component.scss'
})
export class AgregarCarreraComponent implements OnInit{
    // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario) 
    form: FormGroup; 
    // Creacion de objeto que se enviara a traves del endpoint  
    formCarrera: Carrera; 
    // Variable que permite manejar la subscripcion al observable de ruta. 
    onRouteStart!: Subscription;

    id!: number; 
   
    // Inyeccion de dependencias 
    private readonly formBuilder = inject(FormBuilder); 
    private readonly carreraService = inject(CarrerasService); 
    private readonly router = inject(Router); 
    private readonly activedRoute = inject(ActivatedRoute); 
    private readonly location = inject(Location); 
   
    constructor() { 
        this.formCarrera = {} as Carrera; 
        // Se inicia el controlador del formulario 
        this.form = this.formBuilder.group({ 
          codigo: ['',[Validators.required]], 
          nombre: ['', [Validators.required]]
        }); 
    } 
   
    ngOnInit(): void { 
      // Se inicializa el observable de ruta 
      this.onRouteStart = this.activedRoute.params.subscribe((temp) => { 
        // Se almacena el valor capturado en la ruta. 
        this.id = temp['id']; 
      }); 
   
        
      if(this.id && this.id > 0 ){ 
        // Es edicion 
       
       this.carreraService.obtenerCarreraPorID(this.id).subscribe({ 
        next: (temp) => { 
          this.formCarrera = temp; 
   
          // Se rellena la informacion del formulario 
          this.form.controls['codigo'].setValue(this.formCarrera.codigo); 
          this.form.controls['nombre'].setValue(this.formCarrera.nombre);
        }, 
        error: (err) => { 
          console.log("Error: ", err); 
        } 
       }); 
      } 
    } 
   
    onSubmit(){ 
      // Asignacion de valores 
              this.formCarrera.codigo = 
              this.form.get('codigo')?.value; 
              this.formCarrera.nombre = 
              this.form.get('nombre')?.value; 
   
      // Mostrar dialogo 
      Swal.fire({ 
        allowOutsideClick: false, 
        icon: 'info', 
        text: 'Guardando registro, espere por favor...' 
      }); 
   
      Swal.showLoading(); 
   
      // Se valida si la variable idEstudiante contiene valor, los escenarios son: 
      // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos. 
      // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion 
      if(this.id && this.id > 0){ 
        this.carreraService.actualizarCarrera(this.id,this.formCarrera).subscribe({ 
          // Respuesta exitosa 
          next: (temp) => { 
            Swal.fire("Actualizado","Registro actualizado con exito","success"); 
           // Navegar hacia atras 
           //this.router.navigate(['']); 
           this.location.back() 
          }, 
          // En caso de error 
          error: (err) => { 
            Swal.fire({ 
              icon: 'error', 
              title: 'Error al actualizar persona', 
              text: parsearErroresAPI(err).toString() 
            }); 
          } 
        }) 
      } else { 
        // Es insercion 
        this.carreraService.agregarCarrera(this.formCarrera).subscribe({ 
          // Respuesta exitosa 
          next: (temp) => { 
            Swal.fire("Registrado","Registro insertado con éxito","success"); 
           // Navegar hacia atras 
           //this.router.navigate(['']); 
           this.location.back() 
          }, 
          // En caso de error 
          error: (err) => { Swal.fire({ 
            icon: 'error', 
            title: 'Error al insertar persona', 
            text: parsearErroresAPI(err).toString() 
          }); 
        } 
      }) 
    } 
  } 
  
  /* Funcion que permite validar los campos del formulario  
    trabaja evaluando si el campo ha sido manipulado o esta vacio*/ 
  validateField(field: string){ 
    return this.form.get(field)?.invalid && this.form.get(field)?.touched; 
  } 
}