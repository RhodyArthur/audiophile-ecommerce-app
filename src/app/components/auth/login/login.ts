import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

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
        console.log(email, password)
        await this.authService.logIn(email, password);
        this.router.navigate(['/'])
        this.clearForm();
      }
      catch(err) {
        this.errorMessage.set('Failed to log in');
        console.error('Login error caught in component:', err);
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
