import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';

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
    ThemeModule.forRoot()
  ],
  providers: []
})
export class AppModule { }
