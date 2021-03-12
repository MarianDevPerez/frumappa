import { Component, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Representante } from 'src/app/interfaces/representante';
import { TipoOrganizacion } from 'src/app/interfaces/tipo-organizacion';
import { OrganizacionesService } from 'src/app/services/organizaciones/organizaciones.service';
import { RepresentanteService } from 'src/app/services/representante/representante.service';
import { TipoOrganizacionService } from 'src/app/services/tipo-organizacion/tipo-organizacion.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-micuentaorganizacion',
  templateUrl: './micuentaorganizacion.component.html',
  styleUrls: ['./micuentaorganizacion.component.scss']
})
export class MicuentaorganizacionComponent implements OnInit {
  public organizacion:Organizacion;
  public representante:Representante;
  public tiposOrganizacion:Array<TipoOrganizacion>;
  constructor(private tokenService:TokenService, private representanteService:RepresentanteService, private tiposOrganizacionService:TipoOrganizacionService, private organizacionService:OrganizacionesService) { }

  ngOnInit(): void {
    this.organizacion=this.tokenService.getOrganizacion();
    this.tiposOrganizacionService.findAllTipoOrganizacion().subscribe((response:Array<TipoOrganizacion>)=>this.tiposOrganizacion=response);
    this.representanteService.findRepresentante(this.organizacion.representante).subscribe((representante:Representante)=>this.representante=representante);
  }
  editarInfo(){
    if(this.organizacion.nombre!=""&&this.organizacion.tipo!=""&&this.organizacion.mail!=""&&this.organizacion.nro_contacto!=undefined&&this.organizacion.descripcion!=""&&this.representante.nomyape!=""&&this.representante.dni!=undefined&&this.organizacion.mail!=""&&this.organizacion.nro_contacto!=null&&this.representante.dni!=null){
      //actualiza representante y organizacion
      this.representanteService.editRepresentante(this.representante).subscribe(response=>console.log(response));
      this.organizacionService.editOrganizacion(this.organizacion).subscribe(response=>console.log(response));
    }
  }

}
