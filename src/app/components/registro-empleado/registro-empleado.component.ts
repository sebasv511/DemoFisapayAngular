import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {
  @Input() accion:string="Creación";
  @Input() empleado:any |undefined;
  @Output() onRegistrarEmpleado = new EventEmitter<any>();


  RegistrarEmpleado(){
    const empleado: any = {
      cedula: this.form.get('cedula')?.value,
      nombre: this.form.get('nombre')?.value,
      sexo: this.form.get('sexo')?.value,
      fechaNacimiento: this.form.get('fechaNacimiento')?.value,
      salario: this.form.get('salario')?.value,
      vacunaCovid: this.form.get('vacunaCovid')?.value
    };
    this.onRegistrarEmpleado.emit(empleado);
    this.form.reset();
  }

  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      salario: ['', Validators.required],
      vacunaCovid: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onlyNumber(event:any): boolean {    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
