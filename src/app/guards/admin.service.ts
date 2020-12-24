import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{
  realRol:string;
  constructor(private tokenService:TokenService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
   if(roles){
    roles.forEach(rol=>{
      if(rol==='ROLE_ADMIN'){
        this.realRol='admin';
      }
    });
   }
    
    if(!this.tokenService.getToken()||expectedRol.indexOf(this.realRol)===-1){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
