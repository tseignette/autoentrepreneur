import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {

  isEnglish: boolean;

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.isEnglish = this.locale.startsWith('en');
  }

}
