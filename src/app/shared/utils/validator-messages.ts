import { AbstractControl } from '@angular/forms';

export function getControlErrorMessage(control: AbstractControl | null, customMessages?: Record<string, string>): string | null {
  if (!control || !control.invalid || (!control.touched && !control.dirty)) {
    return null;
  }

  const errors = control.errors;

  if (errors) {
    if (errors['mismatch']) {
      return customMessages?.['mismatch'] || 'Passwords do not match.';
    }

    // --- Custom Password Structure Errors ---
    if (errors['noUppercase']) {
      return customMessages?.['noUppercase'] || 'Password must include at least one uppercase letter.';
    }
    if (errors['noLowercase']) {
      return customMessages?.['noLowercase'] || 'Password must include at least one lowercase letter.';
    }
    if (errors['noNumber']) {
      return customMessages?.['noNumber'] || 'Password must include at least one digit (0-9).';
    }
    if (errors['noSpecialChar']) {
      return customMessages?.['noSpecialChar'] || 'Password must include at least one special character (!@#$%^&*...).';
    }
    if (errors['minlength']) { 
      return customMessages?.['minlength'] || `This field must be at least ${errors['minlength'].requiredLength} characters long.`;
    }
    if (errors['tooShort']) {
      const requiredLength = errors['tooShort']['requiredLength'];
      const actualLength = errors['tooShort']['actualLength'];
      return customMessages?.['tooShort'] || `Password must be at least ${requiredLength} characters long. (Currently: ${actualLength}).`;
    }


    // --- General / Built-in Validator Errors (Remaining) ---
    if (errors['required']) {
      return customMessages?.['required'] || 'This field is required.';
    }
    if (errors['maxlength']) {
      return customMessages?.['maxlength'] || `Cannot exceed ${errors['maxlength'].requiredLength} characters.`;
    }
    if (errors['email']) {
      return customMessages?.['email'] || 'Invalid email format.';
    }
    if (errors['min']) {
      return customMessages?.['min'] || `Value must be at least ${errors['min'].min}.`;
    }
    if (errors['max']) {
      return customMessages?.['max'] || `Value cannot exceed ${errors['max'].max}.`;
    }
    if (errors['pattern']) {
      return customMessages?.['pattern'] || 'Invalid format.';
    }

    return 'An unknown validation error occurred.';
  }

  return null;
}