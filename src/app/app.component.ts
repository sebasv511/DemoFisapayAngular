import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from './services/empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoFisapay';
  empleado: any = { id:'',
    cedula: '', nombre: '', sexo: '', fechaNacimiento: '',
    salario: '', vacunaCovid: ''
  };
  @Input() empleadoEdit: any | undefined;
  listEmpleados: any[] = [];
  displayEmpleado = false;
  displayLista = true;
  constructor(private _empleadoService: EmpleadoService,
    private toastr: ToastrService) {
  }
  @Input() onEdit: boolean = false;  

  ngOnInit(): void {
    this.ObtenerEmpleados();
  }

  onPress() {
    this.onEdit = false;
    this.displayEmpleado = !this.displayEmpleado;
    this.displayLista = !this.displayLista;
  }

  ObtenerEmpleados(inputFiltro?: string) {    
    console.log(inputFiltro)

    var filtro = "";
    if(inputFiltro){
      filtro = inputFiltro;
    }
    
    this._empleadoService.getEmpleados(filtro).subscribe(data => {
      this.listEmpleados = data;
    }, error => {
      console.log(error);
    })
  }

  GetEmpleado(inputEmpleado: any) {
    this.empleado = inputEmpleado;
    this.InsertarEmpleado();
  }

  InsertarEmpleado() {
    console.log(this.empleado);
    this._empleadoService.saveEmpleado(this.empleado).subscribe(data => {
      this.toastr.success('Empleado creado exitosamente', 'Empleado creado');
      this.ObtenerEmpleados();
    }, error => {
      this.toastr.error('Ocurrió un error en la creación del empleado', 'Error');
      console.log(error);
    })
    this.onPress();
  }

  EditarEmpleado(inputEmpleado: any) {
    this.empleadoEdit = inputEmpleado;
    this.onEdit = true;
    this.displayEmpleado = !this.displayEmpleado;
    this.displayLista = !this.displayLista;
  }

  ActualizarEmpleado(inputEmpleado: any) {
    console.log("Actulizando");
    console.log(inputEmpleado);
    this._empleadoService.updateEmpleado(inputEmpleado.id, inputEmpleado).subscribe(data => {
      this.toastr.success('Empleado actualizado exitosamente', 'Empleado actualizado');
      this.ObtenerEmpleados();
    }, error => {
      console.log(error);
    })
    this.displayEmpleado = !this.displayEmpleado;
    this.displayLista = !this.displayLista;
  }

  EliminarEmpleado(id: number) {
    this._empleadoService.deleteEmpleado(id).subscribe(data => {
      this.toastr.error('Empleado eliminado exitosamente', 'Empleado eliminado');
      this.ObtenerEmpleados();
    }, error => {
      console.log(error);
    })
  }
}

