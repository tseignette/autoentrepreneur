import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { nbDecimalsValidator } from 'src/app/@core/core.utils';
import { PriceService, StateService } from 'src/app/@core/services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-daily-income',
  templateUrl: './daily-income.component.html',
  styleUrls: ['./daily-income.component.scss']
})
export class DailyIncomeComponent implements OnDestroy {

  form: FormGroup;

  private stateChangesSub: Subscription;

  constructor(
    private fB: FormBuilder,
    private priceService: PriceService,
    private stateService: StateService
  ) {
    this.form = this.fB.group({
      dailyIncome: [null, [Validators.required, Validators.min(0), nbDecimalsValidator(2)]],
      dailyRate: [null, [Validators.required, Validators.min(0), nbDecimalsValidator(2)]]
    }, {
      updateOn: 'blur'
    });

    // Update daily income when social charges changes
    this.stateChangesSub = this.stateService.stateChanges$
      .pipe(
        filter($event => $event.key === 'socialCharges')
      )
      .subscribe(() => {
        this.updateDailyIncome(false);
      });

    // Update daily rate when daily income changes
    this.dailyIncomeControl.valueChanges.subscribe(value => {
      if (this.dailyIncomeControl.invalid) {
        return;
      }

      const dailyRate = this.priceService.dailyIncomeToDailyRate(value);

      this.dailyRateControl.patchValue(dailyRate, { emitEvent: false });
    });

    // Update daily income when daily rate changes
    this.dailyRateControl.valueChanges.subscribe(() => {
      this.updateDailyIncome(true);
    });

    this.dailyRateControl.patchValue(this.stateService.get('dailyRate'));
  }

  ngOnDestroy(): void {
    if (this.stateChangesSub) {
      this.stateChangesSub.unsubscribe();
    }
  }

  get dailyIncomeControl(): FormControl {
    return this.form.get('dailyIncome') as FormControl;
  }

  get dailyRateControl(): FormControl {
    return this.form.get('dailyRate') as FormControl;
  }

  private updateDailyIncome(saveToState): void {
    const dailyRate = this.dailyRateControl.value;

    if (this.dailyRateControl.invalid) {
      return;
    }

    const dailyIncome = this.priceService.dailyRateToDailyIncome(dailyRate);

    this.dailyIncomeControl.patchValue(dailyIncome, { emitEvent: false });

    if (saveToState) {
      this.stateService.set('dailyRate', dailyRate);
    }
  }

}
