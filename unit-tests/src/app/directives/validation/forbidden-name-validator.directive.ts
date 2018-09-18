import { Directive, Input, OnChanges } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

// (os imports foram omitidos)

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenNameValidatorDirective, multi: true}]
})
export class ForbiddenNameValidatorDirective implements Validator, OnChanges {

  @Input('appForbiddenName') forbiddenName: string;

  private valFn: ValidatorFn;

  ngOnChanges(): void {
    this.valFn = this.forbiddenName ?
      forbiddenNameValidator(new RegExp(this.forbiddenName, 'i')) :
      Validators.nullValidator;
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.valFn(control);
  }

}

/** A hero's name can't match the given regular expression */
export const forbiddenNameValidator = (nameRegexp: RegExp): ValidatorFn => {
  return (control): ValidationErrors => {
    const value = control.value;
    const forbidden = nameRegexp.test(value);
    return forbidden ? {'forbiddenName': {value}} : null;
  };
};
