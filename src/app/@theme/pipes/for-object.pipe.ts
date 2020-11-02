import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forObject'
})
export class ForObjectPipe implements PipeTransform {

  transform(value: object): string[] {
    if (!value) {
      return [];
    }

    return Object.keys(value);
  }

}
