import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css']
})
export class ListadoEmpleadosComponent implements OnInit {
  @Input() listEmpleados: any[] = [];

  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      txtFiltro:[]
    });
  }

  ngOnInit(): void {
  }

  GetTotalSalarios(){
    return this.listEmpleados.reduce( (sum, curr) => sum + curr.salario,0 );
  }

  GetEdad(fechaNacimiento:any){
      const convertAge = new Date(fechaNacimiento);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24))/365) + " Años";    
  }

  @Output() onEliminarEmpleado = new EventEmitter<any>();
  EliminarEmpleado(id:number){
    this.onEliminarEmpleado.emit(id);
  }

  @Output() onEditarEmpleado = new EventEmitter<any>();
  EditarEmpleado(empleado:any){
    this.onEditarEmpleado.emit(empleado);
  }

  @Output() onActualizarEmpleado = new EventEmitter<any>();
  ActualizarEmpleado(empleado:any){
    this.onActualizarEmpleado.emit(empleado);
  }

  @Output() onFiltrarEmpleado = new EventEmitter<any>();
  FiltrarEmpleado(){    
    var filtro:string= this.form.get('txtFiltro')?.value;
    this.onFiltrarEmpleado.emit(filtro);
  }
}
