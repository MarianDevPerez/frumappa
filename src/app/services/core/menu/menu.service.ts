import { Injectable } from '@angular/core';
import { TokenService } from '../../token/token.service';

@Injectable()
export class MenuService {

    menuItems: Array<any>;
    roles: string[];
    isFamilia=false;
    isOrg=false;
    isAdmin=false;

    constructor(private tokenService:TokenService) {
        this.menuItems = [];
        this.roles = this.tokenService.getAuthorities();
        this.roles.forEach(rol => {
            if (rol === 'ROLE_FAM') 
                this.isFamilia=true;
            else if (rol === 'ROLE_ORG') 
                this.isOrg=true;
            else if (rol === 'ROLE_ADMIN')
                this.isAdmin=true;
        });
    }

    addMenu(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {
        
                
        items.forEach((item) => {
            //dependiento el tipo de usuario lleno el sidebar de opciones
            if(this.isFamilia){
                switch(item.text){
                    case 'Mis Arboles':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Mis Solicitudes':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Cuidado de Árboles':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Perfil de Organizaciones':{
                        this.menuItems.push(item);
                        break;
                    }
                    
                }
                
            }else if(this.isOrg){
                switch(item.text){
                    case 'Solicitudes':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Mapa':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Mi Cuenta':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Recolectores':{
                        this.menuItems.push(item);
                        break;
                    }
                    
                }
                
            }else if(this.isAdmin){
                switch(item.text){
                    case 'Familias':{
                        this.menuItems.push(item);
                        break;
                    }
                    case 'Organizaciones':{
                        this.menuItems.push(item);
                        break;
                    }
                    
                }
                
            }
        });
    }

    getMenu() {
        return this.menuItems;
    }

}
