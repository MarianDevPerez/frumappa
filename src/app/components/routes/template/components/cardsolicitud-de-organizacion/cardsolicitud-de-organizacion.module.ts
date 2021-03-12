import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsolicitudDeOrganizacionComponent } from './cardsolicitud-de-organizacion/cardsolicitud-de-organizacion.component';
import { SolicitudorganizacionModule } from '../../solicitudorganizacion/solicitudorganizacion.module';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudconfirmadaModule } from '../../solicitudconfirmada/solicitudconfirmada.module';







const routes: Routes = [

  { path: 'peticion', component: SolicitudorganizacionModule },
  { path: 'confirmadas', component: SolicitudconfirmadaModule },


];


@NgModule({
  declarations: [
    CardsolicitudDeOrganizacionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SolicitudorganizacionModule,
    CommonModule
  ],
  exports: [
    CardsolicitudDeOrganizacionComponent
]
})
export class CardsolicitudDeOrganizacionModule { }
