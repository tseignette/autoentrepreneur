import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable()
export class PriceService {

  constructor(
    private stateService: StateService
  ) { }

  dailyIncomeToDailyRate(dailyIncome: number): number {
    const dailyRate = dailyIncome / (1 - this.socialCharges);

    return Number(dailyRate.toFixed(2));
  }

  dailyRateToDailyIncome(dailyRate: number): number {
    const dailyIncome = dailyRate * (1 - this.socialCharges);

    return Number(dailyIncome.toFixed(2));
  }

  private get socialCharges(): number {
    return this.stateService.get('socialCharges');
  }

}
