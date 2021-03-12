import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arbol } from 'src/app/interfaces/arbol';
import { Familia } from 'src/app/interfaces/familia';
import { Recolector } from 'src/app/interfaces/recolector';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';
import { FamiliasService } from 'src/app/services/familias/familias.service';
import { RecolectoresService } from 'src/app/services/recolectores/recolectores.service';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-solicitudrecoleccion',
  templateUrl: './solicitudrecoleccion.component.html',
  styleUrls: ['./solicitudrecoleccion.component.scss']
})
export class SolicitudrecoleccionComponent implements OnInit {
  public idSolicitud: string;
  public solicitud: Solicitud;
  public arbol:Arbol;
  public familia:Familia;
  public recolectores:Array<Recolector>;
  public recolectorSelect:number;
  constructor(private solicitudService: SolicitudesService, private route: ActivatedRoute, private arbolesService:ArbolesService,private familiaService:FamiliasService, private recolectoresService:RecolectoresService, private router:Router, private location:Location) {
    this.idSolicitud = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.recolectoresService.findAll().subscribe((response:Array<Recolector>)=>this.recolectores=response);
    this.recolectorSelect=-1;

    this.solicitudService.findSolicitud(parseInt(this.idSolicitud)).subscribe((response: Solicitud) => {
      this.solicitud = response;
      this.arbolesService.findArbol(this.solicitud.arbol).subscribe((response:Arbol)=>{
        this.arbol=response;
        this.familiaService.findFamilia(this.arbol.id_familia).subscribe((response:Familia)=>this.familia=response);
      })
    });

  }
  aceptar(){
    if(this.recolectorSelect!=-1){
      this.solicitud.acepta_org=true;
      this.solicitud.recolector=this.recolectorSelect;
      this.solicitudService.editSolicitud(this.solicitud).subscribe(response=>console.log(response));
      this.location.back();
      this.router.navigate(['/homeorganizacion']);
    }
    
  }
}
