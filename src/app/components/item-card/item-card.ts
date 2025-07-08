import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { Spinner } from "../../shared/spinner/spinner";
import { Button } from "../../shared/button/button";
import { CurrencyPipe } from '@angular/common';
import { QuantityButton } from "../../shared/quantity-button/quantity-button";
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-item-card',
  imports: [Spinner, Button, CurrencyPipe, QuantityButton],
  templateUrl: './item-card.html',
  styleUrl: './item-card.sass'
})
export class ItemCard {
 product = input<Product | null>();
 isLoading = signal<boolean>(false);
 private cartService = inject(CartService);
 private authService = inject(AuthService);
 private hotToastService = inject(HotToastService);
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
    this.hotToastService.error('You must be logged in')
  }


  try {
    await this.cartService.addToCart({
      product_id: productId,
      price,
      name,
      quantity: this.currentQuantity(),
      user_id: this.currentUserId() || 'N/A'
    })
    this.hotToastService.success('Item added to cart successfully')
  }
  catch(err: any) {
    this.hotToastService.error(err.message)
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
