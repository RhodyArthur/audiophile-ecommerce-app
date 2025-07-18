import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('repeatPassword')?.value;

    const confirmPasswordControl = formGroup.get('repeatPassword');

    if (password !== confirmPassword && confirmPasswordControl) {
        confirmPasswordControl.setErrors({ mismatch: true });
        return { mismatch: true };
    }
    else {
        if (confirmPasswordControl && confirmPasswordControl.hasError('mismatch')) {
            confirmPasswordControl.setErrors(null);
        }
    }

    return null;
};