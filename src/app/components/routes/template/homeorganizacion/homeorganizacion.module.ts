import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { HomeorganizacionComponent } from './homeorganizacion/homeorganizacion.component';
import { CardsolirecModule } from '../components/cardsolirec/cardsolirec.module';
import { CardconforgModule } from '../components/cardconforg/cardconforg.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudconfirmadaComponent } from '../solicitudconfirmada/solicitudconfirmada/solicitudconfirmada.component';
import { SolicitudrecoleccionComponent } from '../solicitudrecoleccion/solicitudrecoleccion/solicitudrecoleccion.component';
import { CardsolicitudDeOrganizacionModule } from '../components/cardsolicitud-de-organizacion/cardsolicitud-de-organizacion.module';
import { SolicitudrecoleccionModule} from '../solicitudrecoleccion/solicitudrecoleccion.module'






const routes: Routes = [
    { path: '', component: HomeorganizacionComponent,
  children: [
    {
      path: 'a-confirmar/:id', component: SolicitudconfirmadaComponent
    },
    {
      path: 'solicitud-recoleccion/:id', component: SolicitudrecoleccionComponent
    }
  ]
  },
    { path: 'cardsolireg', component: CardsolirecModule },
    { path: 'cardconforg', component: CardconforgModule },
];

@NgModule({
    imports: [
        CardsolirecModule,
        CardconforgModule,
        CardsolicitudDeOrganizacionModule,
        MaterialModule,
        CommonModule,
        NgbModule,
        SolicitudrecoleccionModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
      HomeorganizacionComponent,
    ],
    exports: [
      HomeorganizacionComponent,
      RouterModule
    ]
})
export class HomeorganizacionModule { }
