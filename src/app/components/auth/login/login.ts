import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.sass'
})
export class Login {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private hotToastService = inject(HotToastService);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  loginFom: FormGroup = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  async submit() {
    if(this.loginFom.valid) {
      const {email, password} = this.loginFom.value
      this.isLoading.set(true);
      try {
        await this.authService.logIn(email, password);
        this.hotToastService.success('Login successful')
        this.router.navigate(['/'])
        this.clearForm();
      }
      catch(err: any) {
        console.error('Login error caught in component:', err);
        if (err?.message?.includes('Email not confirmed')) {
        this.errorMessage.set('Check your mail to confirm your email');
        this.hotToastService.error(this.errorMessage())
        } else {
          this.errorMessage.set('Failed to log in.');
          this.hotToastService.error(this.errorMessage())
        }
      }
      finally {
        this.isLoading.set(false);
      }
    }
  }

  clearForm() {
    this.loginFom.reset()
  }

}
