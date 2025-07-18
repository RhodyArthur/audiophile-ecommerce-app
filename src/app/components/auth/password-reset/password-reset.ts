import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/validators/passwordMatch';
import { passwordStructureValidator } from '../../../shared/validators/passwordStructure';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { getControlErrorMessage } from '../../../shared/utils/validator-messages';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.sass'
})
export class PasswordReset {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private hotToastService = inject(HotToastService);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), passwordStructureValidator()]],
    repeatPassword: ['' , [Validators.required, Validators.minLength(8)]]
  }, {validators: passwordMatchValidator})


   async submit() {
    if(this.resetForm.valid) {
      const { password, repeatPassword } = this.resetForm.value;
      this.isLoading.set(true);
      try {
        await this.authService.passwordReset(password);
        this.router.navigate(['login']);
        this.resetForm.reset()
      }
      catch(err: any) {
        console.error('Password Reset error caught in component:', err);
        if (err?.message?.includes('New password should be different from the old password.')) {
        this.errorMessage.set('New password should be different from the old password.');
        this.hotToastService.error(this.errorMessage())
        } else {
          this.errorMessage.set('Failed to reset password.');
          this.hotToastService.error(this.errorMessage())
        }
      }
      finally {
        this.isLoading.set(false);
      }
    }
  }

  get passwordErrorMessage():string | null {
    return getControlErrorMessage(this.resetForm.get('password'));
  }

  get confirmPasswordErrorMessage(): string | null {
    return getControlErrorMessage(this.resetForm.get('repeatPassword'))
  }
}
