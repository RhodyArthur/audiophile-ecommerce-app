import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { Spinner } from "../../shared/spinner/spinner";
import { Button } from "../../shared/button/button";
import { CurrencyPipe } from '@angular/common';
import { QuantityButton } from "../../shared/quantity-button/quantity-button";
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-item-card',
  imports: [Spinner, Button, CurrencyPipe, QuantityButton],
  templateUrl: './item-card.html',
  styleUrl: './item-card.sass'
})
export class ItemCard {
 product = input<Product | null>();
 isLoading = signal<boolean>(false);
 errorMessage = signal<string>('');
 successMessage = signal<string>('');
 private cartService = inject(CartService);
 private authService = inject(AuthService);
 currentQuantity = signal<number>(1);
 currentUserId = signal<string>('');

 constructor() {
  effect(() => {
    this.getUserId();
  })
 }

 async addItemtoCart(product: Product) {
  const { id: productId, price, name } = product

  if (!this.currentUserId()) {
    this.errorMessage.set('User not authenticated')
  }

  try {

    await this.cartService.addToCart({
      product_id: productId,
      price,
      name,
      quantity: this.currentQuantity(),
      user_id: this.currentUserId() || 'N/A'
    })
    this.successMessage.set('Item added to cart successfully');
  }
  catch(err: any) {
    this.errorMessage.set(err.message)
  }
  finally {
    this.currentQuantity.set(1)
  }
 }

 onQuantityChanged(quantity: number) {
  this.currentQuantity.set(quantity)
 }

 getUserId() {
  this.currentUserId.set(this.authService.currentUser()?.id!)
 }
}
