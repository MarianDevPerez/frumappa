import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arbol } from 'src/app/interfaces/arbol';
import { Familia } from 'src/app/interfaces/familia';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';
import { OrganizacionesService } from 'src/app/services/organizaciones/organizaciones.service';
import { SolicitudesService } from 'src/app/services/solicitudes/solicitudes.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-solicituddedonacion',
  templateUrl: './solicituddedonacion.component.html',
  styleUrls: ['./solicituddedonacion.component.scss']
})
export class SolicituddedonacionComponent implements OnInit {
  public familia:Familia;
  public idArbol:number;
  public arbol: Arbol;
  public nuevaSolicitud:Solicitud;
  public organizaciones:Array<Organizacion>;
  public organizacionSelect:string;
  public cantidad:string;
  public unidades:string;
  public fecha:string;
  public hora:string;
  constructor(private arbolesService: ArbolesService, private route: ActivatedRoute, private organizacionesService:OrganizacionesService, private solicitudesService: SolicitudesService, private tokenService:TokenService, private router:Router) { 
    this.idArbol=parseInt(this.route.snapshot.paramMap.get('id')); 
  }
  public confirmarSolicitud(){
    if(this.organizacionSelect!=""&&this.organizacionSelect!="0"){
      if(this.cantidad!=""&&this.cantidad!=null&&this.unidades!=""&&this.unidades!="Unidad"&&this.fecha!=""&&this.hora!=""&&this.fecha!=null&&this.hora!=null){
        this.nuevaSolicitud.fecha=this.fecha;
        this.nuevaSolicitud.hora=this.hora;
        this.nuevaSolicitud.cantidad=this.cantidad+" "+this.unidades;
        
        this.nuevaSolicitud.organizacion=parseInt(this.organizacionSelect);
        console.log(this.nuevaSolicitud);
        this.solicitudesService.createSolicitud(this.nuevaSolicitud).subscribe(solicitud => console.log(solicitud));
        this.router.navigate(['/mis-arboles']);
      }else console.log("Error al cargar nuevo arbol");
      

    }else console.log("Error al cargar nuevo arbol");
  }

  ngOnInit(): void {
    this.familia=this.tokenService.getFamilia();
    this.organizacionSelect="0";
    this.unidades="Unidad";
    this.nuevaSolicitud={
      acepta_familia:true,
      acepta_org:false,
      arbol:this.idArbol,
      familia:this.familia.id
    };
    this.organizacionesService.findAllOrganizaciones()
    .subscribe((response: Array<Organizacion>) => {
      this.organizaciones = response;
    }),
    error=>console.log(error);
    
    this.arbolesService.findArbol(this.idArbol).subscribe((response : Arbol)=>{
      this.arbol=response;
      
    });
  }

}
