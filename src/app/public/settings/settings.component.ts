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
      socialCharges: [null, [Validators.required, Validators.min(0), Validators.max(100), nbDecimalsValidator(2)]]
    }, {
      updateOn: 'blur'
    });

    this.socialChargesControl.valueChanges.subscribe(value => {
      if (this.socialChargesControl.invalid) {
        return;
      }

      this.stateService.set('socialCharges', value / 100);
    });

    this.socialChargesControl.patchValue(this.stateService.get('socialCharges') * 100);
  }

  private get socialChargesControl(): FormControl {
    return this.form.get('socialCharges') as FormControl;
  }

}
