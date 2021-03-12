import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recolector } from 'src/app/interfaces/recolector';
import { RecolectoresService } from 'src/app/services/recolectores/recolectores.service';

@Component({
  selector: 'app-detallerecolector',
  templateUrl: './detallerecolector.component.html',
  styleUrls: ['./detallerecolector.component.scss']
})
export class DetallerecolectorComponent implements OnInit {
  public idRecolector:number;
  public recolector:Recolector;
  constructor(private recolectorService:RecolectoresService, private route:ActivatedRoute) { 
    this.idRecolector=parseInt(this.route.snapshot.paramMap.get('id')); 

  }

  ngOnInit(): void {
    
    this.recolectorService.findRecolector(this.idRecolector).subscribe((recolector:Recolector)=>this.recolector=recolector);

  }
  editarDatos(){
    if(this.recolector.dni!=undefined&&this.recolector.num_contacto!=undefined&&this.recolector.nomyape!=""){
      this.recolectorService.editRecolector(this.recolector).subscribe(response=>console.log(response));

    }
  }

}
