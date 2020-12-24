import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'lodash';
import { Observable } from 'rxjs';
import { Familia } from 'src/app/interfaces/familia';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Representante } from 'src/app/interfaces/representante';
import { UserI } from 'src/app/interfaces/user-i';
import { OrganizacionesService } from '../organizaciones/organizaciones.service';
import { RepresentanteService } from '../representante/representante.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiBaseUrl: string = 'https://apimpf.herokuapp.com';
  constructor(private http: HttpClient, private representanteService: RepresentanteService, private organizacionesServoce: OrganizacionesService) { }

  public registrarFamilia(nuevaFamilia: Familia): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/familia', nuevaFamilia);
  }
  public registrarOrganizacion(nuevaOrganizacion: Organizacion): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/organizacion', nuevaOrganizacion);

  }
  public registrarRepresentate(nuevoRepresentante: Representante): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/representante', nuevoRepresentante);
  }
  // public registrarUsuario(nuevoUsuario):Observable<any>{
  //   return this.http.post(this.apiBaseUrl+'/usuario', nuevoUsuario);
  // }
}
