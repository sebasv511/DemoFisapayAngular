import { Component, Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WatchCompilerHostOfFilesAndCompilerOptions } from 'typescript';
import { EmpleadoService } from './services/empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoFisapay';
  empleado: any = {
    cedula: '', nombre: '', sexo: '', fechaNacimiento: '',
    salario: '', vacunaCovid: ''
  };
  @Input() empleadoEdit:any|undefined;
  listEmpleados: any[] = [];
  totalSalarios:number = 0;
  displayEmpleado =false;
  displayLista=true;
  constructor(private _empleadoService:EmpleadoService,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.ObtenerEmpleados();    
  }

  GetEmpleado(inputEmpleado: any){
    this.empleado = inputEmpleado;
    this.InsertarEmpleado();    
  }

  InsertarEmpleado(){
    this._empleadoService.saveEmpleado(this.empleado).subscribe(data=>{
      this.ObtenerEmpleados();
      this.toastr.success('Empleado creado exitosamente', 'Empleado creado');
    }, error=>{
      this.toastr.error('Ocurrió un error en la creación del empleado', 'Error');
      console.log(error);
    })    
  }

  ObtenerEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{      
      this.listEmpleados = data;
      this.SumarSalarios();
    }, error=>{
      console.log(error);
    })
  }

  SumarSalarios(){
    for(let i=0;i<this.listEmpleados.length;i++){
      this.totalSalarios+=this.listEmpleados[i].salario;      
    }
    console.log(this.totalSalarios);
  }

  EliminarEmpleado(id:number){
    this._empleadoService.deleteEmpleado(id).subscribe(data=>{
      this.toastr.error('Empleado eliminado exitosamente', 'Empleado eliminado');
      this.ObtenerEmpleados();
    }, error=>{
      console.log(error);
    })
  }

  EditarEmpleado(inputEmpleado:any){
    this.empleadoEdit = inputEmpleado;
    console.log(inputEmpleado);
  }
  
  ActualizarEmpleado(inputEmpleado:any){
    this.empleado = inputEmpleado;
    this._empleadoService.updateEmpleado(this.empleado.id, this.empleado).subscribe(data=>{
      this.ObtenerEmpleados();
    }, error=>{
      console.log(error);
    })
  }

  onPress(){
    this.displayEmpleado = !this.displayEmpleado;
    this.displayLista = !this.displayLista;
  }
}

