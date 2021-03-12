import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/interfaces/familia';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { TokenService } from 'src/app/services/token/token.service';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    isFamilia=false;
    isOrg=false;
    organizacion:Organizacion;
    familia:Familia;
    roles:string[];
    constructor(public userblockService: UserblockService, private tokenService: TokenService) {

        this.user = {
            picture: 'assets/img/arbol.jpg'
        };
    }

    ngOnInit() {
        this.roles=this.tokenService.getAuthorities();
        this.roles.forEach(rol => {
            if (rol === 'ROLE_FAM') 
                this.isFamilia=true;
            else if (rol === 'ROLE_ORG') 
                this.isOrg=true;
        });
        if(this.isOrg){
            this.organizacion=this.tokenService.getOrganizacion();
            if(this.organizacion.logo!=null){
                this.user.picture=this.organizacion.logo;
            }
        }else if(this.isFamilia){
            this.familia=this.tokenService.getFamilia();
        }
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
