import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './directives';
import { ConcatPipe, ForObjectPipe, JoinPipe, LastElementPipe, SplitPipe, ToFixedPipe } from './pipes';
import { ChargesBarComponent, GoalBarComponent, MonthlyIncomeComponent, NbWorkDaysComponent } from './components';

const COMPONENTS_PRIVATE = [
  // Add components you do not want to export
];

const COMPONENTS_PUBLIC = [
  ChargesBarComponent,
  GoalBarComponent,
  MonthlyIncomeComponent,
  NbWorkDaysComponent
];

const DIRECTIVES = [
  AutofocusDirective
];

const IMPORTS = [
  CommonModule
];

const PIPES = [
  ConcatPipe,
  ForObjectPipe,
  JoinPipe,
  LastElementPipe,
  SplitPipe,
  ToFixedPipe
];

const PROVIDERS = [
  // Add your components services here
];

@NgModule({
  declarations: [
    ...COMPONENTS_PRIVATE,
    ...COMPONENTS_PUBLIC,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    ...COMPONENTS_PUBLIC,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: IMPORTS
})
export class ThemeModule {

  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: PROVIDERS
    };
  }

}
