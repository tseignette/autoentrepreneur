import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeFr);

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR'
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    }
  ]
})
export class AppModule { }
