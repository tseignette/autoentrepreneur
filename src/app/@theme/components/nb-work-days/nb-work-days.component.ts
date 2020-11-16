import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { nbDaysInInterval } from 'src/app/@core/core.utils';
import { StateService } from 'src/app/@core/services';

@Component({
  selector: 'app-nb-work-days',
  templateUrl: './nb-work-days.component.html',
  styleUrls: ['./nb-work-days.component.scss']
})
export class NbWorkDaysComponent implements OnChanges, OnDestroy {

  @Input() elapsedTimeOnly = false;

  @Input() remainingTimeOnly = false;

  @Input() turnover?: number;

  nbWorkDays?: number;

  nbWorkDaysPerMonth?: number;

  nbWorkDaysPerWeek?: number;

  private stateChangesSub: Subscription;

  constructor(
    private stateService: StateService
  ) {
    this.stateChangesSub = this.stateService.stateChanges$
      .pipe(
        filter($event => $event.key === 'dailyRate')
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
      delete this.nbWorkDays;
      delete this.nbWorkDaysPerMonth;
      delete this.nbWorkDaysPerWeek;
    }
    else {
      let nbDays = 365;

      if (this.elapsedTimeOnly) {
        const yearStart = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);

        nbDays = nbDaysInInterval(yearStart, new Date());
      }
      else if (this.remainingTimeOnly) {
        const yearEnd = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, -1);

        nbDays = nbDaysInInterval(new Date(), yearEnd);
      }

      const nbWorkDays = this.turnover / this.stateService.get('dailyRate');
      const nbWorkDaysPerWeek = 7 * nbWorkDays / nbDays;
      const nbWorkDaysPerMonth = nbWorkDaysPerWeek * 52 / 12;

      this.nbWorkDays = Number(nbWorkDays.toFixed(1));
      this.nbWorkDaysPerMonth = Number(nbWorkDaysPerMonth.toFixed(1));
      this.nbWorkDaysPerWeek = Number(nbWorkDaysPerWeek.toFixed(1));
    }
  }

}
