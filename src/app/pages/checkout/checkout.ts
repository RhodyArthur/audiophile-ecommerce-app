import { Component, computed, inject, signal } from '@angular/core';
import { CheckoutForm } from "../../components/checkout-form/checkout-form";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Cart } from '../../models/cart';
import { ProductImageSet } from '../../models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CheckoutForm],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass'
})
export class Checkout {

  private route = inject(ActivatedRoute);
  private location = inject(Location);

  cartItems = signal<Cart[]>([]);
  productImagesList = signal<ProductImageSet[][]>([]);
  total = signal<number>(0);

  constructor() {
    const resolved = this.route.snapshot.data['cartData'];
    this.cartItems.set(resolved.items);
    this.productImagesList.set(resolved.images);
    this.total.set(resolved.total);
  }


  goBack() {
    this.location.back();
  }
}
