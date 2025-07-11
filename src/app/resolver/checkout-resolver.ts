import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CartService } from '../services/cart-service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Cart } from '../models/cart';
import { ProductImageSet } from '../models/product';

export const checkoutResolver: ResolveFn<Promise<{ items: Cart[], images: ProductImageSet[][] }>> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const cartService = inject(CartService);
  const authService = inject(AuthService);

  try {
    const userId = authService.currentUser()?.id;
     if (!userId) {
      throw new Error('User not logged in');
    }
    return cartService.getCartItemsWithImages(userId);
  } catch (error) {
      console.error('Failed to resolve checkout data', error);
      return { items: [], images: [] };
  }


};
