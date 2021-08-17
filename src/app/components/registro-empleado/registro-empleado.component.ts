import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {
  @Input() onEdit:boolean=false;  
  @Input() empleado:any |undefined;
  @Output() onRegistrarEmpleado = new EventEmitter<any>();
  @Output() onEditarEmpleado = new EventEmitter<any>();
  accion:string="Creación";


  RegistrarEmpleado(){    
    
    if (this.onEdit){
      const empleado: any = {
        id:this.empleado.id,
        cedula: this.form.get('cedula')?.value,
        nombre: this.form.get('nombre')?.value,
        sexo: this.form.get('sexo')?.value,
        fechaNacimiento: this.form.get('fNacimiento')?.value,
        salario: this.form.get('salario')?.value,
        vacunaCovid: this.form.get('vacunaCovid')?.value
      };
      this.onEditarEmpleado.emit(empleado);
    }else{
      const empleado: any = {        
        cedula: this.form.get('cedula')?.value,
        nombre: this.form.get('nombre')?.value,
        sexo: this.form.get('sexo')?.value,
        fechaNacimiento: this.form.get('fNacimiento')?.value,
        salario: this.form.get('salario')?.value,
        vacunaCovid: this.form.get('vacunaCovid')?.value
      };
      this.onRegistrarEmpleado.emit(empleado);
    }    
    this.form.reset();
  }

  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      fNacimiento: ['', Validators.required],
      salario: ['', Validators.required],
      vacunaCovid: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log(this.onEdit)
    if(this.onEdit){         
      this.CargarEmpleadoEdit();
    }
  }

  onlyNumber(event:any): boolean {    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  CargarEmpleadoEdit(){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(this.empleado.fechaNacimiento, 'd/MM/YYYY')

    this.accion="Modificación";   
    this.form.get('cedula')?.setValue(this.empleado.cedula);
    this.form.get('nombre')?.setValue(this.empleado.nombre);
    this.form.get('sexo')?.setValue(this.empleado.sexo);
    this.form.get('fNacimiento')?.setValue(formattedDate);
    this.form.get('salario')?.setValue(this.empleado.salario);
    this.form.get('vacunaCovid')?.setValue(this.empleado.vacunaCovid);
  }
}
