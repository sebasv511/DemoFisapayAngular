import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css']
})
export class ListadoEmpleadosComponent implements OnInit {
  @Input() listEmpleados: any[] = [];
  @Input() totalSalarios:number=0;
  constructor() { }

  ngOnInit(): void {
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
}
