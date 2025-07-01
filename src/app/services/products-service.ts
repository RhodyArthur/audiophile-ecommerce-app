import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private supabaseService = inject(SupabaseService);


  async fetchProducts(): Promise<Product[]> {
    const { data, error } = await this.supabaseService
    .getClient()
    .from('products')
    .select('*')
    .order('id', {ascending: true});

    if (error) {
      console.error(error)
      return []
    }

    return data as Product[]
  }

  async fetchProductsByCategory(category: string) {
    const { data, error } = await this.supabaseService
    .getClient()
    .from('products')
    .select('*')
    .eq('category', category)
    .order('id', {ascending: true});

    if (error) {
      console.error(error)
      return []
    }

    return data as Product[]
  }
}
