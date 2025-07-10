import { Component, computed, inject, signal } from '@angular/core';
import { CheckoutForm } from "../../components/checkout-form/checkout-form";
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../models/cart';
import { ProductImageSet } from '../../models/product';

@Component({
  selector: 'app-checkout',
  imports: [CheckoutForm],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass'
})
export class Checkout {

  private route = inject(ActivatedRoute);
  cartItems = signal<Cart[]>([]);
  productImagesList = signal<ProductImageSet[][]>([]);

  constructor() {
    const resolved = this.route.snapshot.data['cartData'];
    this.cartItems.set(resolved.items);
    this.productImagesList.set(resolved.images);
  }


  total = computed(() => this.cartItems().reduce((total, item) => total + item.quantity * item.price, 0))
}
