import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from './services';

const IMPORTS = [
  CommonModule
];

const PROVIDERS = [
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
