import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/validators/passwordMatch';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.sass'
})
export class Signup {

  private fb = inject(FormBuilder);
  private router = inject(Router)

  signupForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', Validators.required]
  }, {validators: passwordMatchValidator})

  submit() {
    if(this.signupForm.valid) {
      const {fullName, email, password} = this.signupForm.value
      console.log(fullName, email, password)
      this.router.navigate(['login'])
    }
    this.clearForm()
  }
  
  clearForm() {
    this.signupForm.reset()
  }
}

