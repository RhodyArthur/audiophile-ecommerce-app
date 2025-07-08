import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private supabase = inject(SupabaseService);

  async addToCart(cartItem: Partial<Cart>) {
    const { error } = await this.supabase
    .getClient()
    .from('cart')
    .insert(cartItem)

    if (error) {
      console.error('Failed to add item to cart', error.message);
      throw error
    };
  }
}
