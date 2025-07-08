import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { CurrencyPipe } from '@angular/common';
import { QuantityButton } from "../../../shared/quantity-button/quantity-button";
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Cart as cartInterface } from '../../../models/cart';


@Component({
  selector: 'app-cart',
  imports: [Button, CurrencyPipe, QuantityButton],
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
    try {
      let items = await this.cartService.getCartItems(this.currentUserId());
      this.cartItems.set(items)
    }
    catch(err: any) {
      this.hotToastService.error(err.message)
    }
    finally {

    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  getUserId() {
    this.currentUserId.set(this.authService.currentUser()?.id!)
  }
}
