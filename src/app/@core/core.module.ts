import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceService, StateService } from './services';

const IMPORTS = [
  CommonModule
];

const PROVIDERS = [
  PriceService,
  StateService
];

@NgModule({
  imports: IMPORTS
})
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: PROVIDERS
    };
  }

}
