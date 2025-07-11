import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-modal',
  imports: [],
  templateUrl: './checkout-modal.html',
  styleUrl: './checkout-modal.sass'
})
export class CheckoutModal implements OnInit, OnDestroy{
  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
