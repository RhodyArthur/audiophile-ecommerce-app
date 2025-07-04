import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/validators/passwordMatch';
import { passwordStructureValidator } from '../../../shared/validators/passwordStructure';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.sass'
})
export class Signup {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  signupForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), passwordStructureValidator()]],
    repeatPassword: ['', Validators.required]
  }, {validators: passwordMatchValidator})

  async submit() {
  if(this.signupForm.valid) {
    const { fullName, email, password } = this.signupForm.value;
    this.isLoading.set(true);
    try {
      const data = await this.authService.signUp(email, password, fullName);
      this.router.navigate(['login']);
      this.clearForm();
    }
    catch(err: any) {
      console.error('Signup error caught in component:', err);
      if (err?.message?.includes('User already registered')) {
        this.errorMessage.set('This email is already registered.');
      } else {
        this.errorMessage.set('Failed to create an account.');
      }
    }
    finally {
      this.isLoading.set(false);
    }
  }
}

  
  clearForm() {
    this.signupForm.reset()
  }
}

