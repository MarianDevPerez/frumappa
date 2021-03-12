import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-homeorganizacion',
  templateUrl: './homeorganizacion.component.html',
  styleUrls: ['./homeorganizacion.component.scss']
})
export class HomeorganizacionComponent implements OnInit {
  public solicitudesConfirmadas: Array<Solicitud>;
  public solicitudesDeFamilias: Array<Solicitud>;
  public solicitudesPendientes: Array<Solicitud>;
  public solicitudes:Array<Solicitud>;
  public organizacion:Organizacion;
  constructor(private solicitudesService: SolicitudesService,private acordeonConfig:NgbAccordionConfig, private route:Router, private tokenService:TokenService) { 
    acordeonConfig.closeOthers=false;
  }

  ngOnInit() {
    this.solicitudes=[];
    this.organizacion=this.tokenService.getOrganizacion();
    
    this.solicitudesService.findAllSolicitudesByIdOrganizacion(this.organizacion.id)
    .subscribe((response: Array<Solicitud>) => {
    this.solicitudes = response;
    this.divideSolicitudes();
  });
    


  }
  private divideSolicitudes(){
    this.solicitudesConfirmadas=this.solicitudes.filter(solicitudes => (solicitudes.acepta_familia == true && solicitudes.acepta_org == true));
    this.solicitudesPendientes=this.solicitudes.filter(solicitudes => (solicitudes.acepta_familia == false && solicitudes.acepta_org == true));
    this.solicitudesDeFamilias=this.solicitudes.filter(solicitudes => (solicitudes.acepta_familia == true && solicitudes.acepta_org == false));
    console.log(this.solicitudesConfirmadas);
  }
}
