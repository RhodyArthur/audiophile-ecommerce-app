import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/validators/passwordMatch';
import { passwordStructureValidator } from '../../../shared/validators/passwordStructure';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.sass'
})
export class PasswordReset {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), passwordStructureValidator()]],
    confirmPassword: ['' , [Validators.required, Validators.minLength(8)]]
  }, {validators: passwordMatchValidator})


   async submit() {
  if(this.resetForm.valid) {
    const { password, confirmPassword } = this.resetForm.value;
    this.isLoading.set(true);
    try {
      await this.authService.passwordReset(password);
      this.router.navigate(['login']);
    }
    catch(err: any) {
      console.error('Password Reset error caught in component:', err);
      this.errorMessage.set('Failed to reset password.');
    }
    finally {
      this.isLoading.set(false);
    }
  }
  }
}
