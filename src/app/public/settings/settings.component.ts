import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { nbDecimalsValidator } from 'src/app/@core/core.utils';
import { StateService } from 'src/app/@core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService
  ) {
    this.form = this.fb.group({
      socialChargesRate: [null, [Validators.required, Validators.min(0), Validators.max(100), nbDecimalsValidator(2)]]
    }, {
      updateOn: 'blur'
    });

    this.socialChargesRateControl.valueChanges.subscribe(value => {
      if (this.socialChargesRateControl.invalid) {
        return;
      }

      this.stateService.set('socialChargesRate', value / 100);
    });

    this.socialChargesRateControl.patchValue(this.stateService.get('socialChargesRate') * 100);
  }

  get socialChargesRateControl(): FormControl {
    return this.form.get('socialChargesRate') as FormControl;
  }

}
