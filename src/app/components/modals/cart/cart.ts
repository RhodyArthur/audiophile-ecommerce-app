import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { QuantityButton } from "../../../shared/quantity-button/quantity-button";
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Cart as cartInterface } from '../../../models/cart';
import { Spinner } from "../../../shared/spinner/spinner";


@Component({
  selector: 'app-cart',
  imports: [Button, CurrencyPipe, QuantityButton, Spinner, SlicePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.sass'
})
export class Cart implements OnInit, OnDestroy{

  protected cartService = inject(CartService);
  private authService = inject(AuthService);
  private hotToastService = inject(HotToastService);
  currentUserId = signal<string>('');
  isLoading = signal<boolean>(false);
  cartItems = signal<cartInterface[]>([]);

  constructor() {
    effect(() => {
      this.getUserId();
      this.getItemsPerUser()
    })
  }

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  async getItemsPerUser() {
    this.isLoading.set(true);
    try {
      let items = await this.cartService.getCartItems(this.currentUserId());
      this.cartItems.set(items)
    }
    catch(err: any) {
      this.hotToastService.error(err.message)
    }
    finally {
      this.isLoading.set(false);
    }
  }

  getItemsTotal(): number {
    return this.cartItems().reduce((curr, acc) => curr + acc.quantity * acc.price, 0)
  }

  getUserId() {
    this.currentUserId.set(this.authService.currentUser()?.id!)
  }

  async removeall() {
    this.isLoading.set(true);
    try {
      await this.cartService.deleteAllCartItems(this.currentUserId());
      await this.cartService.fetchCartCount(this.currentUserId());
      this.cartItems.set([]);
      this.hotToastService.success('Successfully cleared all cart items');
    }
    catch(err: any) {
      this.hotToastService.error(err.message);
    }
    finally {
      this.isLoading.set(false);
    }
  }

  checkoutItems() {

  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
