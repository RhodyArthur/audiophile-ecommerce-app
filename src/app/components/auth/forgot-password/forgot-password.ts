import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.sass'
})
export class ForgotPassword {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  form:FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  }) 

  async onSend() {
    if (this.form.valid) {
      this.isLoading.set(true);
      try {
        await this.authService.sendPasswordResetEmail(this.form.value);
      }
      catch(err) {
        this.errorMessage.set('Failed to send password reset link')
        console.error('Failed to send password reset link', err);
      }
      finally {
        this.isLoading.set(false);
      }
    }
  }
}
