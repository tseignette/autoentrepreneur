import { Injectable } from '@angular/core';
import { StateService } from './state.service';

const incomeTaxAllowance = 0.34;
/**
 * From 0 € to 10 777 €, tax is 0%
 * From 10 778 € to 27 478 €, tax is 30%
 * ...
 */
const incomeTaxGroups = [
  [0, 0],
  [10778, 0.11],
  [27479, 0.3],
  [78571, 0.41],
  [168994, 0.45],
  [Infinity]
];

@Injectable()
export class PriceService {

  constructor(
    private stateService: StateService
  ) { }

  computeIncomeTax(turnover: number): number {
    let i = 0;
    let incomeTax = 0;
    let reducedTurnover = (1 - incomeTaxAllowance) * turnover;

    while (reducedTurnover > 0) {
      const group = incomeTaxGroups[i + 1][0] - incomeTaxGroups[i][0];
      const groupTaxRate = incomeTaxGroups[i][1];

      if (reducedTurnover < group) {
        incomeTax += reducedTurnover * groupTaxRate;
      }
      else {
        incomeTax += group * groupTaxRate;
      }

      i++;
      reducedTurnover -= group;
    }

    return Number(incomeTax.toFixed(2));
  }

  computeSocialCharges(turnover: number): number {
    const socialCharges = turnover * this.socialCharges;

    return Number(socialCharges.toFixed(2));
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
