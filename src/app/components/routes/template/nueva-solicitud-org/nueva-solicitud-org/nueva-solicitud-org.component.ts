import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arbol } from 'src/app/interfaces/arbol';
import { Familia } from 'src/app/interfaces/familia';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Recolector } from 'src/app/interfaces/recolector';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';
import { FamiliasService } from 'src/app/services/familias/familias.service';
import { RecolectoresService } from 'src/app/services/recolectores/recolectores.service';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-nueva-solicitud-org',
  templateUrl: './nueva-solicitud-org.component.html',
  styleUrls: ['./nueva-solicitud-org.component.scss']
})
export class NuevaSolicitudOrgComponent implements OnInit {
  public organizacion: Organizacion;
  idArbol: number;
  public arbol: Arbol;
  public familia: Familia;
  public recolectores: Array<Recolector>;
  public nuevaSolicitud: Solicitud;
  public recolectorSelect: number;
  constructor(private route: ActivatedRoute, private arbolesService: ArbolesService, private familiaService: FamiliasService, private recolectoresService: RecolectoresService, private solicitudesService: SolicitudesService, private router: Router, private tokenService: TokenService) {
    this.idArbol = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    this.recolectores = [];
    this.recolectorSelect = -1;
    this.arbolesService.findArbol(this.idArbol).subscribe(arbol => {
      this.arbol = arbol;
      this.familiaService.findFamilia(arbol.id_familia).subscribe(familia => this.familia = familia);
    });

    this.recolectoresService.findAll().subscribe(response => this.recolectores = response);
    this.organizacion = this.tokenService.getOrganizacion();

    this.nuevaSolicitud = {
      acepta_familia: false,
      acepta_org: true,
      arbol: this.idArbol,
      organizacion: this.organizacion.id
    }


  }
  public pedirDonacion() {
    if (this.recolectorSelect != undefined && this.recolectorSelect != NaN && this.recolectorSelect != -1) {


      this.nuevaSolicitud.recolector = this.recolectorSelect;
      this.nuevaSolicitud.familia=this.familia.id;

      this.solicitudesService.createSolicitud(this.nuevaSolicitud).subscribe(solicitud => {
        console.log(solicitud);
        this.router.navigate(['/mapa-arboles']);

      });



    } else console.log("Error al cargar nueva solicitud");
  }

}
