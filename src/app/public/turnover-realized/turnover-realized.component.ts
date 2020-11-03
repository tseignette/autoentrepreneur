import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { nbDecimalsValidator } from 'src/app/@core/core.utils';
import { StateService } from 'src/app/@core/services';

@Component({
  selector: 'app-turnover-realized',
  templateUrl: './turnover-realized.component.html',
  styleUrls: ['./turnover-realized.component.scss']
})
export class TurnoverRealizedComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService
  ) {
    const turnoverRealized = this.stateService.get('turnoverRealized');

    this.form = this.fb.group({
      turnoverRealized: [turnoverRealized, [Validators.required, Validators.min(0), nbDecimalsValidator(2)]]
    }, {
      updateOn: 'blur'
    });

    this.turnoverRealizedControl.valueChanges.subscribe(value => {
      if (this.turnoverRealizedControl.invalid) {
        return;
      }

      this.stateService.set('turnoverRealized', value);
    });
  }

  get turnoverRealizedControl(): FormControl {
    return this.form.get('turnoverRealized') as FormControl;
  }

}
