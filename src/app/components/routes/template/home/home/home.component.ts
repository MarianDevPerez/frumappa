import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Arbol } from 'src/app/interfaces/arbol';
import { Familia } from 'src/app/interfaces/familia';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TokenService } from 'src/app/services/token/token.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public username:string;
    public arboles: Array<Arbol>;
    public familia: Familia;
    constructor(private arbolesService: ArbolesService, private messageService: MessageService, private router: Router, private tokenService:TokenService) { }

    ngOnInit() {
        this.familia=this.tokenService.getFamilia();
        console.log(this.familia);
        this.arbolesService.findAllbyIdFamilia(this.familia.id)
    .subscribe((response: Array<Arbol>) => {
      this.arboles = response; 
    }),
    error=>console.log(error);

    this.messageService.getMessage().subscribe(res=>{
        this.username=res['text'];
    }),
    error=>console.log(error);

    }

    public irNuevoArbol(){
        this.router.navigate(['mis-arboles/nuevoarbol']);
    }



}