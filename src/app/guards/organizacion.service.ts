import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService implements CanActivate{
  realRol:string;
  constructor(private tokenService:TokenService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
   this.realRol='';
    roles.forEach(rol=>{
      if(rol==='ROLE_ORG'){
        this.realRol='org';
      }

    });
    if(!this.tokenService.getToken()||expectedRol.indexOf(this.realRol)===-1){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
