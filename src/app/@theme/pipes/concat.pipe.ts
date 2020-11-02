import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat'
})
export class ConcatPipe<A, B> implements PipeTransform {

  transform(value: A[], array: B[]): (A |  B)[] {
    if (!value) {
      return array;
    }

    return [
      ...value,
      ...array
    ];
  }

}
