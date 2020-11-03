import { Injectable } from '@angular/core';
import { StateService } from './state.service';

/**
 * From 0 € to 10 064 €, tax is 0%
 * From 10 064 € to 25 659 €, tax is 30%
 * ...
 */
const incomeTaxGroups = [
  [0, 0],
  [10064, 0.11],
  [25659, 0.3],
  [73369, 0.41],
  [157806, 0.45],
  [Infinity]
];

@Injectable()
export class PriceService {

  constructor(
    private stateService: StateService
  ) { }

  computeCharges(value: number): number {
    const socialCharges = value * this.socialCharges;

    return Number(socialCharges.toFixed(2));
  }

  computeIncomeTax(value: number): number {
    let i = 0;
    let incomeTax = 0;

    while (value > 0) {
      const group = incomeTaxGroups[i + 1][0] - incomeTaxGroups[i][0];
      const groupTaxRate = incomeTaxGroups[i][1];

      if (value < group) {
        incomeTax += value * groupTaxRate;
      }
      else {
        incomeTax += group * groupTaxRate;
      }

      i++;
      value -= group;
    }

    return Number(incomeTax.toFixed(2));
  }

  dailyIncomeToDailyRate(dailyIncome: number): number {
    const dailyRate = dailyIncome / (1 - this.socialCharges);

    return Number(dailyRate.toFixed(2));
  }

  dailyRateToDailyIncome(dailyRate: number): number {
    const dailyIncome = dailyRate * (1 - this.socialCharges);

    return Number(dailyIncome.toFixed(2));
  }

  private get socialCharges(): number {
    return this.stateService.get('socialChargesRate');
  }

}
