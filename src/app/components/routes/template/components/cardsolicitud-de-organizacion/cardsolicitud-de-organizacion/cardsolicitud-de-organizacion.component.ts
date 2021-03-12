import { Component, Input, OnInit } from '@angular/core';
import { Arbol } from 'src/app/interfaces/arbol';
import { Familia } from 'src/app/interfaces/familia';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';
import { FamiliasService } from 'src/app/services/familias/familias.service';

@Component({
  selector: 'app-cardsolicitud-de-organizacion',
  templateUrl: './cardsolicitud-de-organizacion.component.html',
  styleUrls: ['./cardsolicitud-de-organizacion.component.scss']
})
export class CardsolicitudDeOrganizacionComponent implements OnInit {
  @Input() solicitud: Solicitud;
  public arbol:Arbol;
  public familia:Familia;
  constructor(private arbolesService: ArbolesService, private familiaService:FamiliasService) { }

  ngOnInit(): void {
    this.arbolesService.findArbol(this.solicitud.arbol)
    .subscribe((response: Arbol) => {
      this.arbol = response;
      this.familiaService.findFamilia(this.arbol.id_familia)
    .subscribe((response: Familia) => {
      this.familia = response;
    });
    });
    
  }
}
