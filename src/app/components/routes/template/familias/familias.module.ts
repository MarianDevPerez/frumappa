import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliasComponent } from './familias/familias.component';
import { Routes, RouterModule } from '@angular/router';
import { FamiliascardModule } from '../components/familiascard/familiascard.module';
import { FamiliaModule } from '../familia/familia.module';
import { FamiliaComponent } from '../familia/familia/familia.component';


const routes: Routes = [
    { path: '', component: FamiliasComponent,
       children: [
          {
            path: 'familia/:id', component: FamiliaComponent
          },
        ]
  
  },
];



@NgModule({
  declarations: [
    FamiliasComponent
  ],
  imports: [
    FamiliascardModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    FamiliasComponent,
    RouterModule,
  ]
})
export class FamiliasModule { }
