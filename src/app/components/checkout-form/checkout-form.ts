import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../shared/validators/phoneNumber.validator';
import { Subject, takeUntil } from 'rxjs';
import { Button } from "../../shared/button/button";
import { Cart } from '../../models/cart';
import { ProductImageSet } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, Button, CurrencyPipe, RouterOutlet],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.sass'
})
export class CheckoutForm {
  private fb = inject(FormBuilder);
  private toast = inject (HotToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isVirtual = signal<boolean>(true);
  cartItems = input<Cart[]>([]);
  imageList = input<ProductImageSet[][]>([]);
  total = input<number>(0);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.setupPaymentMethodListener();
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
  
    if (this.checkoutForm.invalid) {
     this.checkoutForm.markAllAsTouched();
     return;
    }

    this.toast.success('Order placed successfully');
    this.router.navigate(
      [{ outlets: { modal: ['checkout-modal'] } }],
      { relativeTo: this.route.parent });
  }

  shippingFee = computed(() => this.total() * (5/100))

  vat = computed(() => this.total() * (2/100))

  grandTotal = computed(() => this.total() + this.vat() + this.shippingFee())


  private setupPaymentMethodListener() {
  const paymentGroup = this.checkoutForm.get('payment');
  const methodControl = paymentGroup?.get('method');
  const eMoneyNumberControl = paymentGroup?.get('eMoneyNumber');
  const eMoneyPinControl = paymentGroup?.get('eMoneyPin');

  methodControl?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value: string) => {
      this.isVirtual.set(value === 'e-money');

      if (value === 'e-money') {
        eMoneyNumberControl?.setValidators([Validators.required, Validators.minLength(9)]);
        eMoneyPinControl?.setValidators([Validators.required, Validators.minLength(4)]);
      } else {
        eMoneyNumberControl?.clearValidators();
        eMoneyPinControl?.clearValidators();
      }

      eMoneyNumberControl?.updateValueAndValidity();
      eMoneyPinControl?.updateValueAndValidity();
    });
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
