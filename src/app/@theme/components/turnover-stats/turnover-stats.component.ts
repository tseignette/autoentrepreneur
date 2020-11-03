import { Component, Input, OnChanges } from '@angular/core';
import { nbDaysInInterval } from 'src/app/@core/core.utils';
import { PriceService, StateService } from 'src/app/@core/services';

@Component({
  selector: 'app-turnover-stats',
  templateUrl: './turnover-stats.component.html',
  styleUrls: ['./turnover-stats.component.scss']
})
export class TurnoverStatsComponent implements OnChanges {

  @Input() disabled: boolean;

  @Input() turnover: number;

  stats: {
    monthlyIncome: number,
    nbWorkDays: number,
    nbWorkDaysPerMonth: number,
    nbWorkDaysPerWeek: number
  };

  constructor(
    private priceService: PriceService,
    private stateService: StateService
  ) { }

  ngOnChanges(): void {
    if (this.disabled) {
      delete this.stats;
    }
    else {
      const income = this.turnover
        - this.priceService.computeSocialCharges(this.turnover)
        - this.priceService.computeIncomeTax(this.turnover);
      const yearStart = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
      const nbDaysSinceYearStart = nbDaysInInterval(yearStart, new Date());
      const nbMonthsSinceYearStart = nbDaysSinceYearStart * 12 / 365;
      const monthlyIncome = income / nbMonthsSinceYearStart;
      const nbWorkDays = this.turnover / this.stateService.get('dailyRate');
      const nbWorkDaysPerWeek = 7 * nbWorkDays / nbDaysSinceYearStart;
      const nbWorkDaysPerMonth = nbWorkDaysPerWeek * 52 / 12;

      this.stats = {
        monthlyIncome: Number(monthlyIncome.toFixed(2)),
        nbWorkDays: Number(nbWorkDays.toFixed(1)),
        nbWorkDaysPerMonth: Number(nbWorkDaysPerMonth.toFixed(1)),
        nbWorkDaysPerWeek: Number(nbWorkDaysPerWeek.toFixed(1))
      };
    }
  }

}
