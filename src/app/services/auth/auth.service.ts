import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from 'src/app/models/jwt-DTO/jwt-dto';
import { LoginUsuario } from 'src/app/models/login-usuario/login-usuario';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario/nuevo-usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL='https://apimpf.herokuapp.com/';

  constructor(private http: HttpClient) { }

  public nuevoUsuario(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.http.post<any>(this.authURL+'auth/nuevo/', nuevoUsuario);
  }
  
  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    return this.http.post<JwtDTO>(this.authURL+'auth/login/', loginUsuario);
  }
  public actualizaUsuario(usuario:NuevoUsuario): Observable<any>{
    return this.http.put<any>(this.authURL+'usuario/', usuario);
  }

}
