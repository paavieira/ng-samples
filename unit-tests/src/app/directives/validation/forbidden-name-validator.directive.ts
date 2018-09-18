import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenNameValidatorDirective, multi: true}]
})
export class ForbiddenNameValidatorDirective implements Validator {

  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ?
      forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control) :
      null;
  }

}

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRegexp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRegexp.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
