import { OnChanges, SimpleChanges, Input, Directive, HostListener } from '@angular/core';
import { AbstractControl, ValidatorFn, Validator, Validators, NG_VALIDATORS } from '@angular/forms';

/**
 * Input Regex Directive
 */

export function inputValidator(value: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const input = control.value;
    const test = value.test(input);
    return test ? null : {'input-regex': {input}};
  };
}

@Directive({
  selector: '[input-regex]',
  providers: [{provide: NG_VALIDATORS, useExisting: InputRegexDirective, multi: true}]
})
export class InputRegexDirective implements Validator {

  @Input('input-regex') inputRegex: string;
  @Input('input-value') input: string;
  private valFn = Validators.nullValidator;

  @HostListener('keyup') onKeyUp() {
    const re = new RegExp(this.inputRegex, 'i');
    this.valFn = inputValidator(re);
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
