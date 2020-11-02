import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

const IMPORTS = [
  CommonModule
];

const PROVIDERS = [
  // Add your services here
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
