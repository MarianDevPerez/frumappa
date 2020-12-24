import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arbol } from 'src/app/interfaces/arbol';
import { Especie } from 'src/app/interfaces/especie';
import { ArbolesService } from 'src/app/services/arboles/arboles.service';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { GoogleComponent } from '../../maps/google/google.component';

@Component({
  selector: 'app-nuevoarbol',
  templateUrl: './nuevoarbol.component.html',
  styleUrls: ['./nuevoarbol.component.scss']
})
export class NuevoarbolComponent implements OnInit {
  public arbol: Arbol;
  arbolId:string;
  public especies:Array<Especie>;
  constructor(public arbolesService:ArbolesService, private especieService:EspeciesService, private router:Router) { 
  }
  @ViewChild(GoogleComponent) mapaGoogle;

  ngOnInit(): void {
    this.arbol={
      nom_especie:"Seleccione una Especie...",
      id_familia:1
  };
    this.especieService.findAll().subscribe((especies:Array<Especie>)=>this.especies=especies);
  }
  public guardarArbol(){
    if(this.arbol.nom_especie!="Seleccione una Especie..."&& this.arbol.nom_especie!=""&& this.arbol.nom_especie!=undefined){
      this.arbol.lat=this.mapaGoogle.lat;
      this.arbol.lng=this.mapaGoogle.lng;
      console.log(this.arbol);
      this.arbolesService.createArbol(this.arbol).subscribe(arbol => {
        console.log(arbol);
        this.router.navigate(['/mis-arboles']);
      })
      
    }else console.log("Error al cargar nuevo arbol");
  }

}
