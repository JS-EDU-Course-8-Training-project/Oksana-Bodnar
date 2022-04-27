import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mustBePasswordValidator(passwordRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const mustBe = passwordRe.test(control.value);
    return mustBe ?  null : {mustBePassword: {value: control.value}};
  };
}