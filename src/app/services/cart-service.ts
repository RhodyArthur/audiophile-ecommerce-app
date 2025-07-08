import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private supabase = inject(SupabaseService);

  cartCount = signal<number>(0);

  async addToCart(item: Partial<Cart>) {
    const { data, error } = await this.supabase
      .getClient()
      .from('cart')
      .select('*')
      .eq('product_id', item.product_id)
      .eq('user_id', item.user_id)
      .maybeSingle();

    if (error) {
      console.error('Error checking existing cart item:', error.message);
      throw error;
    }

    if (data) {
      // Product already exists → update quantity
      const newQuantity = data.quantity + item.quantity;
      const { error: updateError } = await this.supabase
        .getClient()
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('id', data.id);

      if (updateError) {
        console.error('Error updating cart item:', updateError.message);
        throw updateError;
      }
    } else {
      // Product doesn't exist → insert new
      const { error: insertError } = await this.supabase
        .getClient()
        .from('cart')
        .insert(item);

      if (insertError) {
        console.error('Error inserting cart item:', insertError.message);
        throw insertError;
      }
    }

    // Update local cart count reactively
    this.cartCount.update(count => count + item.quantity!);
  }
}
