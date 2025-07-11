import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Button } from "../../../shared/button/button";
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { QuantityButton } from "../../../shared/quantity-button/quantity-button";
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth-service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Cart as cartInterface } from '../../../models/cart';
import { Spinner } from "../../../shared/spinner/spinner";
import { ProductsService } from '../../../services/products-service';
import { ProductImageSet } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';


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
  private productService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  currentUserId = signal<string>('');
  isLoading = signal<boolean>(false);
  cartItems = signal<cartInterface[]>([]);
  itemQuantities = signal<Record<number, number>>({});
  productImagesList = signal<ProductImageSet[][]>([]);


  constructor() {
    effect(() => {
      this.getUserId();
      this.loadCartItemsWithImages()
    })
  }

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  async loadCartItemsWithImages() {
    this.isLoading.set(true);
    try {
      const { items, images } = await this.cartService.getCartItemsWithImages(this.currentUserId());
      this.cartItems.set(items);
      this.productImagesList.set(images);

      const quantities: Record<number, number> = {};
      items.forEach(item => { quantities[item.id] = item.quantity; });
      this.itemQuantities.set(quantities);

    } catch (err: any) {
      this.hotToastService.error(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  getItemsTotal(): number {
    const quantities = this.itemQuantities();
    return this.cartItems().reduce((total, item) => {
      const quantity = quantities[item.id] ?? item.quantity;
      return total + quantity * item.price;
    }, 0);
  }

  getUserId() {    
    this.currentUserId.set(this.authService.currentUser()?.id!)
  }

  onQuantityChanged(itemId: number, newQuantity: number) {
    this.itemQuantities.update(q => ({ ...q, [itemId]: newQuantity }));
    this.cartService.updateCartItemQuantity(itemId, newQuantity);
  }


  async removeall() {
    if (this.cartItems().length === 0) {
      this.hotToastService.info('There are no items in cart to delete');
      return;
    }
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

  async deleteItem(cartId: number) {
    this.isLoading.set(true);
    try {
      await this.cartService.deleteCartItem(cartId);
      await this.cartService.fetchCartCount(this.currentUserId());
      const updatedItems = await this.cartService.getCartItems(this.currentUserId());
      this.cartItems.set(updatedItems);

      this.hotToastService.success('Successfully deleted cart item');
    }
    catch(err: any) {
      this.hotToastService.error(err.message);
    }
    finally {
      this.isLoading.set(false);
    }
  }

  checkoutItems() {
    if (this.cartItems().length <= 0) {
      this.hotToastService.info('There are no items to checkout')
      return;
    }

    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.route.parent })
    .then(() => {
      this.router.navigate(['checkout']);
    });
  }

  async getProductImages() {
    const productIds = this.cartItems().map(item => item.product_id);

    const imagesList = await Promise.all(
      productIds.map(id => this.productService.fetchProductImagesById(id))
    );

    this.productImagesList.set(imagesList);
  }


  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
