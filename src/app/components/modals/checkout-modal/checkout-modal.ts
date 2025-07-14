import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImageSet } from '../../../models/product';
import { Cart } from '../../../models/cart';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-checkout-modal',
  imports: [Button, CurrencyPipe, SlicePipe],
  templateUrl: './checkout-modal.html',
  styleUrl: './checkout-modal.sass'
})
export class CheckoutModal implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  cartItems = signal<Cart[]>([]);
  imageList = signal<ProductImageSet[][]>([]);
  total = signal<number>(0);
  showAll = signal<boolean>(false);
  

  constructor() {
    const resolved = this.route.snapshot.data['cartData'];
    this.cartItems.set(resolved.items);
    this.imageList.set(resolved.images);
    this.total.set(resolved.total);
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
    });
  }
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
