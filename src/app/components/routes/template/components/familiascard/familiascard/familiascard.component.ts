import { Component, Input, OnInit } from '@angular/core';
import { Arbol } from 'src/app/interfaces/arbol';
import { Familia } from 'src/app/interfaces/familia';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';

@Component({
  selector: 'app-familiascard',
  templateUrl: './familiascard.component.html',
  styleUrls: ['./familiascard.component.scss']
})
export class FamiliascardComponent implements OnInit {
  @Input() familia: Familia;
  cantidadArboles: number;
  constructor(private arbolesService: ArbolesService) { }

  ngOnInit(): void {
    this.arbolesService.findAllbyIdFamilia(this.familia.id).subscribe((arboles: Array<Arbol>) => {
      this.cantidadArboles = arboles.length;
    });
  }

}
