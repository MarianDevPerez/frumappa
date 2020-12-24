import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';

import { CoreModule } from './components/core/core.module';
import { LayoutModule } from './components/layout/layout.module';
import { SharedModule } from './components/shared/shared.module';
import { RoutesModule } from './components/routes/routes.module';
//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OAuthModule } from 'angular-oauth2-oidc';

//interceptor Provider
import { interceptorProvider } from './interceptors/user-interceptor.service';


// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:8080/api'],//requestmapping
                sendAccessToken: true
            }
        }),
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgbModule
    ],
    providers: [interceptorProvider],
    bootstrap: [AppComponent]
})
export class AppModule { }
