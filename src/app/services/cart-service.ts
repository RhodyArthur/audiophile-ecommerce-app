import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Cart } from '../models/cart';
import { ProductImageSet } from '../models/product';
import { ProductsService } from './products-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private supabase = inject(SupabaseService);
  private productService = inject(ProductsService);

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
    await this.fetchCartCount(item.user_id!);
  }

  async fetchCartCount(userId: string) {
    const { count, error } = await this.supabase
      .getClient()
      .from('cart')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (!error && count !== null) {
      this.cartCount.set(count);
    }
  }

  async getCartItems(userId: string): Promise<Cart[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from('cart')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error getting cart items:', error.message);
      throw error;
    }
    return data
  }

  async getCartItemsWithImages(userId: string): Promise<{ items: Cart[], images: ProductImageSet[][], total: number }> {
    const items = await this.getCartItems(userId);

    let images: ProductImageSet[][] = [];
    if (items.length > 0) {
      const productIds = items.map(item => item.product_id);
      images = await Promise.all(
        productIds.map(id => this.productService.fetchProductImagesById(id))
      );
    }
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);



    return { items, images, total };
  }

  async updateCartItemQuantity(itemId: number, newQuantity: number) {
    const { data, error } = await this.supabase
    .getClient()
    .from('cart')
    .update({quantity: newQuantity})
    .eq('id', itemId)

    if (error) {
      console.error('Error updating cart item quantity:', error.message);
      throw error;
    }

    return data 
  }

  async deleteCartItem(itemId: number) {
    const {data, error} = await this.supabase
      .getClient()
      .from('cart')
      .delete()
      .eq('id', itemId)

      if (error) {
      console.error('Error deleting cart item:', error.message);
      throw error;
    }

    return true
  }

  async deleteAllCartItems(userId: string) {
    const {data, error} = await this.supabase
      .getClient()
      .from('cart')
      .delete()
      .eq('user_id', userId)

      if (error) {
      console.error('Error deleting cart items:', error.message);
      throw error;
    }

    return data
  }
}
