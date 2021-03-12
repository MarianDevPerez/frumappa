import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Representante } from 'src/app/interfaces/representante';
import { OrganizacionesService } from 'src/app/services/organizaciones/organizaciones.service';
import { RepresentanteService } from 'src/app/services/representante/representante.service';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.scss']
})
export class OrganizacionComponent implements OnInit {
  public idOrganizacion:number;
  public organizacion:Organizacion;
  public representante:Representante;
  constructor(private route:ActivatedRoute,private organizacionService:OrganizacionesService,private representantesService:RepresentanteService) {
    this.idOrganizacion=parseInt(this.route.snapshot.paramMap.get('id')); 
   }

  ngOnInit(): void {
    this.organizacionService.findOrganizacion(this.idOrganizacion).subscribe((response : Organizacion)=>{
      this.organizacion=response;
      console.log(this.organizacion);
      this.representantesService.findRepresentante(this.organizacion.representante).subscribe((representante:Representante)=> this.representante=representante);//

    });
  }

}
