import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private appUrl = 'https://localhost:44358/';
  private apiUrl = 'api/empleado/'

  constructor(private http:HttpClient) { }
  getEmpleados():Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl);
  }
  saveEmpleado(empleado:any):Observable<any>{
    console.log(empleado);
    return this.http.post(this.appUrl + this.apiUrl, empleado);
  }
  deleteEmpleado(id:number):Observable<any>{            
    return this.http.delete(this.appUrl + this.apiUrl + id);
  }
  updateEmpleado(id:number, empleado:any):Observable<any>{
    return this.http.put(this.appUrl + this.apiUrl + id, empleado)
  }
}
