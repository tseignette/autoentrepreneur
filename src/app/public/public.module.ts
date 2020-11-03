import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { DailyIncomeComponent } from './daily-income/daily-income.component';
import { ThemeModule } from '../@theme/theme.module';
import { TurnoverRealizedComponent } from './turnover-realized/turnover-realized.component';

@NgModule({
  declarations: [
    PublicComponent,
    SettingsComponent,
    DailyIncomeComponent,
    TurnoverRealizedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    ThemeModule
  ]
})
export class PublicModule { }
