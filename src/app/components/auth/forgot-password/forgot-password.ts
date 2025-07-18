import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';
import { getControlErrorMessage } from '../../../shared/utils/validator-messages';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.sass'
})
export class ForgotPassword {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private hotToastService = inject(HotToastService);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  form:FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  }) 

  async onSend() {
    if (this.form.valid) {
      this.isLoading.set(true);
      try {
        const email = this.form.value.email
        await this.authService.sendPasswordResetEmail(email);
        this.hotToastService.success('Email sent successfully!')
        this.form.reset();
      }
      catch(err) {
        this.errorMessage.set('Failed to send password reset link')
        this.hotToastService.error(this.errorMessage())
        console.error('Failed to send password reset link', err);
      }
      finally {
        this.isLoading.set(false);
      }
    }
  }

   get emailErrorMessage(): string | null {
    return getControlErrorMessage(this.form.get('email'));
  }

}
