import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { CurrencyPipe } from '@angular/common';
import { QuantityButton } from "../../../shared/quantity-button/quantity-button";

@Component({
  selector: 'app-cart',
  imports: [Button, CurrencyPipe, QuantityButton],
  templateUrl: './cart.html',
  styleUrl: './cart.sass'
})
export class Cart implements OnInit, OnDestroy{
  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
