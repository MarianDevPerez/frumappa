import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './template/pages/login/login.component';
import { RegisterComponent } from './template/pages/register/register.component';
import { RecoverComponent } from './template/pages/recover/recover.component';
import { LockComponent } from './template/pages/lock/lock.component';
import { MaintenanceComponent } from './template/pages/maintenance/maintenance.component';
import { Error404Component } from './template/pages/error404/error404.component';
import { Error500Component } from './template/pages/error500/error500.component';
import { OrganizacionesModule } from './template/organizaciones/organizaciones.module';
import { FamiliaService as FamiliaGuard} from './../../guards/familia.service';
import { OrganizacionService as OrganizacionGuard} from './../../guards/organizacion.service';
import { AdminService as AdminGuard} from './../../guards/admin.service';
import { BienvenidaComponent } from './template/pages/bienvenida/bienvenida.component';


export const routes: Routes = [

    // Not lazy-loaded routes
    { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
    { path: 'bienvenida', component: BienvenidaComponent },


    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'mis-arboles', loadChildren: () => import('./template/home/home.module').then(m => m.HomeModule)//,canActivate: [FamiliaGuard],data: {expectedRol: ['fam']}
         },
            //{ path: 'home', loadChildren: () => import('./template/home/home.module').then(m => m.HomeModule) },
            //{ path: 'dashboard', loadChildren: () => import('./template/dashboard/dashboard.module').then(m => m.DashboardModule) },
            //{ path: 'widgets', loadChildren: () => import('./template/widgets/widgets.module').then(m => m.WidgetsModule) },
            //{ path: 'material', loadChildren: () => import('./template/material/material.module').then(m => m.MaterialModule) },
            //{ path: 'elements', loadChildren: () => import('./template/elements/elements.module').then(m => m.ElementsModule) },
            //{ path: 'forms', loadChildren: () => import('./template/forms/forms.module').then(m => m.FormsModule) },
            //{ path: 'charts', loadChildren: () => import('./template/charts/charts.module').then(m => m.ChartsModule) },
            //{ path: 'tables', loadChildren: () => import('./template/tables/tables.module').then(m => m.TablesModule) },
            { path: 'maps', loadChildren: () => import('./template/maps/maps.module').then(m => m.MapsModule) },
            //{ path: 'blog', loadChildren: () => import('./template/blog/blog.module').then(m => m.BlogModule) },
            //{ path: 'ecommerce', loadChildren: () => import('./template/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            //{ path: 'extras', loadChildren: () => import('./template/extras/extras.module').then(m => m.ExtrasModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'mis-solicitudes', loadChildren: () => import('./template/missolicitudes/missolicitudes.module').then(m => m.MissolicitudesModule)//,canActivate: [FamiliaGuard],data: {expectedRol: ['fam']}
         },
            // tslint:disable-next-line: max-line-length
            { path: 'organizaciones', loadChildren: () => import('./template/organizaciones/organizaciones.module').then(m => m.OrganizacionesModule)//,canActivate: [AdminGuard],data: {expectedRol: ['admin']} 
        },//only admin
            { path: 'familias', loadChildren: () => import('./template/familias/familias.module').then(m => m.FamiliasModule)// ,canActivate: [AdminGuard],data: {expectedRol: ['admin']}
        },//only admin
            // tslint:disable-next-line: max-line-length
            { path: 'recolectores', loadChildren: () => import('./template/recolectores/recolectores.module').then(m => m.RecolectoresModule) ,//canActivate: [OrganizacionGuard],data: {expectedRol: ['org']} 
        },
            // tslint:disable-next-line: max-line-length
            { path: 'micuenta', loadChildren: () => import('./template/micuentaorganizacion/micuentaorganizacion.module').then(m => m.MicuentaorganizacionModule)// ,canActivate: [OrganizacionGuard],data: {expectedRol: ['org']}
        },
            //FALTA MAPA
            { path: 'mapa-arboles', loadChildren: () => import('./template/mapaarboles/mapaarboles.module').then(m => m.MapaarbolesModule)// ,canActivate: [OrganizacionGuard],data: {expectedRol: ['org']}
        },

            // tslint:disable-next-line: max-line-length
            { path: 'homeorganizacion', loadChildren: () => import('./template/homeorganizacion/homeorganizacion.module').then(m => m.HomeorganizacionModule) ,//canActivate: [OrganizacionGuard], data: {expectedRol: ['org']}
        },
            // tslint:disable-next-line: max-line-length
            { path: 'perfilorganizacion', loadChildren: () => import('./template/perfilorganizacion/perfilorganizacion.module').then(m => m.PerfilorganizacionModule)//,canActivate: [FamiliaGuard],data: {expectedRol: ['fam']} 
        },
            { path: 'cuidados', loadChildren: () => import('./template/cuidadodearboles/cuidadodearboles.module').then(m => m.CuidadodearbolesModule)//,canActivate: [FamiliaGuard],data: {expectedRol: ['fam']}
        },



        ]
    },

    


    // Not found
    { path: '**', redirectTo: 'login' }

];
