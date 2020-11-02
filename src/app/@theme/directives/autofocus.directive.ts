import { OnInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {

  @Input() autofocus = true;

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit(): void {
    if (this.autofocus) {
      this.element.nativeElement.focus();
    }
  }

}
