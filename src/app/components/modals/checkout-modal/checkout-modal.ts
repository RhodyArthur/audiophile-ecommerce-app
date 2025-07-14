import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImageSet } from '../../../models/product';
import { Cart } from '../../../models/cart';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-checkout-modal',
  imports: [Button, CurrencyPipe, SlicePipe],
  templateUrl: './checkout-modal.html',
  styleUrl: './checkout-modal.sass'
})
export class CheckoutModal implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cartItems = signal<Cart[]>([]);
  imageList = signal<ProductImageSet[][]>([]);
  total = signal<number>(0);
  showAll = signal<boolean>(false);
  currentUserId = signal<string>('');
  

  constructor() {
    const resolved = this.route.snapshot.data['cartData'];
    this.cartItems.set(resolved.items);
    this.imageList.set(resolved.images);
    this.total.set(resolved.total);

    if(this.authService.currentUser()) {
      let id = this.authService.currentUser()?.id
      this.currentUserId.set(String(id))
    }
  }

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  visibleItems = computed(() => {
    return this.showAll() ? this.cartItems() : this.cartItems().slice(0, 1);
  });


  remainingItemsCount = computed(() => this.cartItems().length - 1);

  grandTotal = computed(() => this.total() + (this.total() * (2/100)) + (this.total() * (5/100)))

  backToHome() {
    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent })
    .then(() => {
      this.router.navigate(['/']);
      this.cartService.deleteAllCartItems(this.currentUserId());
      this.cartService.fetchCartCount(this.currentUserId());
    });
  }

  closeModal() {
    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent })
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
