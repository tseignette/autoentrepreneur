import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function countDecimals(value: number): number {
  if (Math.floor(value) === value) {
    return 0;
  }

  return value.toString().split('.')[1].length;
}

export function nbDaysInInterval(start: Date, end: Date): number {
  const dayInMs = 24 * 60 * 60 * 1000;

  return Math.ceil((end.getTime() - start.getTime()) / dayInMs);
}

export function nbDecimalsValidator(nbDecimalsMax = 0): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const nbDecimals = countDecimals(control.value);

      if (nbDecimals > nbDecimalsMax) {
        return { nbDecimalsMax, actual: nbDecimals };
      }
    }

    return null;
  };
}
