import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable()
export class PriceService {

  constructor(
    private stateService: StateService
  ) { }

  computeCharges(value: number): number {
    const socialCharges = value * this.socialCharges;

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
