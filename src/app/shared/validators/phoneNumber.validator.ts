import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value?.toString().trim() || '';

    if (!value) return null;

    const pattern = /^(?:\+?\d{9,14}|0\d{9})$/;

    return pattern.test(value) ? null : { invalidPhoneNumber: true };
  };
}
