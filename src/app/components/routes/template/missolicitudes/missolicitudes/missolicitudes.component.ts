import { Component, OnInit } from '@angular/core';
import { Familia } from 'src/app/interfaces/familia';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-missolicitudes',
  templateUrl: './missolicitudes.component.html',
  styleUrls: ['./missolicitudes.component.scss']
})
export class MissolicitudesComponent implements OnInit {
  public solicitudes: Array<Solicitud>;
  public solicitudesConfirmadas: Array<Solicitud>=[];
  public solicitudesDeOrganizaciones: Array<Solicitud>=[];
  public solicitudesPendientes: Array<Solicitud>=[];
  public familia:Familia;
  constructor(private solicitudesService: SolicitudesService, private tokenService:TokenService) { }

  ngOnInit() {
    this.familia=this.tokenService.getFamilia();
    this.solicitudes=[];
    
    this.solicitudesService.findAllSolicitudesByIdFamilia(this.familia.id)
    .subscribe((response: Array<Solicitud>) => {
    this.solicitudes = response;
    this.divideSolicitudes();
  });

  }
  private divideSolicitudes(){
    this.solicitudesConfirmadas=this.solicitudes.filter(solicitudes => (solicitudes.acepta_familia == true && solicitudes.acepta_org == true));
    this.solicitudesPendientes=this.solicitudes.filter(solicitudes => (solicitudes.acepta_familia == true && solicitudes.acepta_org == false));
    this.solicitudesDeOrganizaciones=this.solicitudes.filter(solicitudes => (solicitudes.acepta_familia == false && solicitudes.acepta_org == true));
  }

}
