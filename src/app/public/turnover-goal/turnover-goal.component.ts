import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { nbDecimalsValidator } from 'src/app/@core/core.utils';
import { StateService } from 'src/app/@core/services';

@Component({
  selector: 'app-turnover-goal',
  templateUrl: './turnover-goal.component.html',
  styleUrls: ['./turnover-goal.component.scss']
})
export class TurnoverGoalComponent implements OnDestroy {

  form: FormGroup;

  turnoverRealized: number;

  turnoverRemaining?: number;

  private stateChangesSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService
  ) {
    this.turnoverRealized = this.stateService.get('turnoverRealized');
    this.form = this.fb.group({
      turnoverGoal: [
        this.stateService.get('turnoverGoal'),
        [Validators.required, Validators.min(0), nbDecimalsValidator(2)]
      ]
    }, {
      updateOn: 'blur'
    });

    this.listenToForm();
    this.listenToState();
    this.updateTurnoverRemaining();
  }

  ngOnDestroy(): void {
    if (this.stateChangesSub) {
      this.stateChangesSub.unsubscribe();
    }
  }

  get turnoverGoalControl(): FormControl {
    return this.form.get('turnoverGoal') as FormControl;
  }

  private listenToForm(): void {
    this.turnoverGoalControl.valueChanges.subscribe(value => {
      this.updateTurnoverRemaining();

      if (this.turnoverGoalControl.invalid) {
        return;
      }

      this.stateService.set('turnoverGoal', value);
    });
  }

  private listenToState(): void {
    this.stateChangesSub = this.stateService.stateChanges$
      .pipe(
        filter($event => $event.key === 'turnoverRealized')
      )
      .subscribe(item => {
        this.turnoverRealized = item.value;

        this.updateTurnoverRemaining();
      });
  }

  private updateTurnoverRemaining(): void {
    if (this.turnoverGoalControl.value === null || this.turnoverGoalControl.value === undefined) {
      delete this.turnoverRemaining;
    }
    else {
      this.turnoverRemaining = this.turnoverGoalControl.value - this.turnoverRealized;
    }
  }

}
