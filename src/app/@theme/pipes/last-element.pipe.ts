import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastElement'
})
export class LastElementPipe<T> implements PipeTransform {

  transform(value: T[]): T {
    if (!value) {
      return;
    }

    return value[value.length - 1];
  }

}
