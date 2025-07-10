import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../shared/validators/phoneNumber.validator';
import { Subscription } from 'rxjs/internal/Subscription';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { Button } from "../../shared/button/button";

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.sass'
})
export class CheckoutForm {
  private fb = inject(FormBuilder);
  isVirtual = signal<boolean>(true);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.checkoutForm.get('payment.method')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isVirtual.set(value === 'e-money');
      });
  }

  checkoutForm: FormGroup = this.fb.group({
    billingDetails: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneNumberValidator()]]
    }),

    shippingInfo: this.fb.group({
      address: ['' , Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      country: ['', Validators.required]
    }),

    payment: this.fb.group({
    method: ['e-money', Validators.required],
    eMoneyNumber: ['', [Validators.required, Validators.minLength(9)]],
    eMoneyPin: ['', [Validators.required, Validators.minLength(4)]],
  })
  })

  submit() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value)
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
