import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService implements CanActivate{
  realRol:string;
  constructor(private tokenService:TokenService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
   //this.realRol='fam';
  //  this.realRol='';
   if(roles){
    roles.forEach(rol=>{
      if(rol==='ROLE_FAM'){
        this.realRol='fam';
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
