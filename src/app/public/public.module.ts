import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    PublicComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
