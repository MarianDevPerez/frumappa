import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../../services/core/translator/translator.service';
import { MenuService } from '../../services/core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './template/pages/pages.module';
import { NuevoarbolModule } from './template/nuevoarbol/nuevoarbol.module';
import { SolicituddedonacionModule } from './template/solicituddedonacion/solicituddedonacion.module';
import { MissolicitudesModule } from './template/missolicitudes/missolicitudes.module';



import { menu } from './menu';
import { routes } from './routes';

@NgModule({
    imports: [
        MissolicitudesModule,
        SolicituddedonacionModule,
        NuevoarbolModule,
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [ ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
