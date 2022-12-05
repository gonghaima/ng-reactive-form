import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FormGroup, FormBuilder, Validator } from '@angular/forms';
interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges {
  @Input()
  jsonFormData!: JsonFormData;

  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      // console.log(this.jsonFormData);
      this.createForm(this.jsonFormData.controls);
    }
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      this.myForm.addControl(control.name, this.fb.control(''));
    }
  }
}
