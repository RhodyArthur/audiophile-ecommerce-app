import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.sass'
})
export class Login {

  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginFom: FormGroup = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  submit() {
    if(this.loginFom.valid) {
      const formData = this.loginFom.value
      console.log(formData)
      this.router.navigate(['/'])
    }
  }


}
