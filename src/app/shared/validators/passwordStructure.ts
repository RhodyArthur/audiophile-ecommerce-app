import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStructureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;

    return valid ? null : {
      passwordStructure: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isLongEnough
      }
    };
  };
}
