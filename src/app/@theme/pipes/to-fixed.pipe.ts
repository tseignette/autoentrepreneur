import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: number, fractionDigits?: number): string {
    if (value === undefined || value === null) {
      return '';
    }

    return value.toFixed(fractionDigits);
  }

}
