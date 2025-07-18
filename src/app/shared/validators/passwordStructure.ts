import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStructureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const errors: ValidationErrors = {};

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    if (!hasUpperCase) {
      errors['noUppercase'] = true;
    }
    if (!hasLowerCase) {
      errors['noLowercase'] = true;
    }
    if (!hasNumber) {
      errors['noNumber'] = true;
    }
    if (!hasSpecialChar) {
      errors['noSpecialChar'] = true;
    }
    if (!isLongEnough) {
      errors['tooShort'] = { requiredLength: 8, actualLength: value.length };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
