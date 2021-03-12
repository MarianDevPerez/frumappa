import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Recolector } from 'src/app/interfaces/recolector';
import { RecolectoresService } from 'src/app/services/recolectores/recolectores.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-nuevorecolector',
  templateUrl: './nuevorecolector.component.html',
  styleUrls: ['./nuevorecolector.component.scss']
})
export class NuevorecolectorComponent implements OnInit {
  public nuevoRecolector:Recolector;
  public organizacion:Organizacion;
  public dni:number;
  public num_contacto:number;
  public nomyape:string;
  constructor(private tokenService:TokenService, private recolectorService:RecolectoresService, private router:Router) { }

  ngOnInit(): void {
    this.dni=null;
    this.num_contacto=null;
    this.nomyape="";
    this.organizacion=this.tokenService.getOrganizacion();
    this.nuevoRecolector={
      nomyape:"",
      organizacion:this.organizacion.id,
      dni:undefined,
      num_contacto:undefined
    }


  }
  agregarRecolector(){
    if(this.nuevoRecolector.nomyape!=""&&this.nuevoRecolector.dni!=undefined&&this.nuevoRecolector.num_contacto!=undefined){
      if(this.nuevoRecolector.picture==null||this.nuevoRecolector.picture==undefined){
        this.nuevoRecolector.picture='https://previews.123rf.com/images/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilustr.jpg'
      }
      this.recolectorService.createRecolector(this.nuevoRecolector).subscribe(recolector=>{
        console.log(recolector);
        this.router.navigate(['/recolectores']);
      }),error=>console.log(error);
    }
  }

}
