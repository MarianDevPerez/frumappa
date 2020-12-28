import { Injectable } from '@angular/core';
import { Familia } from 'src/app/interfaces/familia';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { FamiliasService } from '../familias/familias.service';
import { OrganizacionesService } from '../organizaciones/organizaciones.service';


const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const IDENTITY = 'AuthIdentity';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles:Array<string>=[];
  familia:Familia;
  organizacion:Organizacion;

  constructor(private familiaService: FamiliasService, private organizacionService: OrganizacionesService) { }

  public setFamilia(idFamilia: number){
    window.sessionStorage.removeItem(IDENTITY);
    this.familiaService.findFamilia(idFamilia).subscribe((familia: Familia)=>{
      window.sessionStorage.setItem(IDENTITY,JSON.stringify(familia));
    })
  }
  public getFamilia():Familia{
    this.familia={};
    if(sessionStorage.getItem(IDENTITY)){
      this.familia=JSON.parse(sessionStorage.getItem(IDENTITY));
    }
    return this.familia;
  }

  public setOrganizacion(idOrganizacion: number){
    window.sessionStorage.removeItem(IDENTITY);
    this.organizacionService.findOrganizacion(idOrganizacion).subscribe((organizacion: Organizacion)=>{
      window.sessionStorage.setItem(IDENTITY,JSON.stringify(organizacion));
    })
  }
  public getOrganizacion():Organizacion{
    this.organizacion={};
    if(sessionStorage.getItem(IDENTITY)){
      this.organizacion=JSON.parse(sessionStorage.getItem(IDENTITY));
    }
    return this.organizacion;
  }

  public setToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY);
  }
  
  public setUserName(userName:string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,userName);
  }
  public getUserName():string{
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities:string[]){
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }
  public getAuthorities():string[]{
    this.roles =[];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut():void{
    window.sessionStorage.clear();
  }

}
