import { Component, Input, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/interfaces/organizacion';
import { Representante } from 'src/app/interfaces/representante';
import { RepresentanteService } from 'src/app/services/representante/representante.service';

@Component({
  selector: 'app-organizacioncard',
  templateUrl: './organizacioncard.component.html',
  styleUrls: ['./organizacioncard.component.scss']
})
export class OrganizacioncardComponent implements OnInit {
  @Input() organizacion:Organizacion;
  public representante:Representante;
  constructor(private representantesService:RepresentanteService) { }

  ngOnInit(): void {
    console.log(this.organizacion.representante);
    this.representantesService.findRepresentante(this.organizacion.representante).subscribe((representante:Representante)=> this.representante=representante);//
    console.log(this.representante);
  }

}
