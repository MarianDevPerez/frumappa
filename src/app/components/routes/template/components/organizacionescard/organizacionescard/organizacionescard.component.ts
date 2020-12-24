import { Component, Input, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Representante } from 'src/app/interfaces/representante';
import { RepresentanteService } from 'src/app/services/representante/representante.service';

@Component({
  selector: 'app-organizacionescard',
  templateUrl: './organizacionescard.component.html',
  styleUrls: ['./organizacionescard.component.scss']
})
export class OrganizacionescardComponent implements OnInit {
  @Input() organizacion:Organizacion;
  public representante:Representante;
  constructor(private representantesService:RepresentanteService) { }

  ngOnInit(): void {
    this.representantesService.findRepresentante(this.organizacion.representante).subscribe((representante:Representante)=>this.representante=representante)
  }

}
