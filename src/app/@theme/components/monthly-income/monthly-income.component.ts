import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { nbDaysInInterval } from 'src/app/@core/core.utils';
import { PriceService, StateService } from 'src/app/@core/services';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss']
})
export class MonthlyIncomeComponent implements OnChanges, OnDestroy {

  @Input() elapsedTimeOnly = false;

  @Input() turnover?: number;

  monthlyIncome?: number;

  private stateChangesSub: Subscription;

  constructor(
    private priceService: PriceService,
    private stateService: StateService
  ) {
    this.stateChangesSub = this.stateService.stateChanges$
      .pipe(
        filter($event => $event.key === 'socialChargesRate')
      )
      .subscribe(() => {
        this.updateValues();
      });
  }

  ngOnChanges(): void {
    this.updateValues();
  }

  ngOnDestroy(): void {
    if (this.stateChangesSub) {
      this.stateChangesSub.unsubscribe();
    }
  }

  private updateValues(): void {
    if (this.turnover === null || this.turnover === undefined) {
      delete this.monthlyIncome;
    }
    else {
      const income = this.turnover
        - this.priceService.computeSocialCharges(this.turnover)
        - this.priceService.computeIncomeTax(this.turnover);
      let nbMonths = 12;

      if (this.elapsedTimeOnly) {
        const yearStart = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
        const nbDaysSinceYearStart = nbDaysInInterval(yearStart, new Date());

        nbMonths = nbDaysSinceYearStart * 12 / 365;
      }

      const monthlyIncome = income / nbMonths;

      this.monthlyIncome = Number(monthlyIncome.toFixed(2));
    }
  }

}
