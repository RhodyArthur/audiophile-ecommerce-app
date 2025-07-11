import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Product, ProductImageSet, RelatedProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private supabaseService = inject(SupabaseService);


  async getProductSlug(productId: number): Promise<string | null> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('products')
      .select('slug')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product slug:', error.message);
      return null;
    }

    return data?.slug ?? null;
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

  async fetchProductImagesById(id: number) {
    const { data, error } = await this.supabaseService
    .getClient()
    .from('product_images')
    .select('*')
    .eq('product_id', id)
    .order('id', {ascending: true});

    if (error) {
      console.error(error)
      return []
    }

    return data as ProductImageSet[]
  }

  async fetchProductDetails(slug: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('products')
      .select(`
        *,
        product_images (*),
        product_includes (*),
        product_gallery (*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('fetchProductDetails error', error.message);
      return null;
    }
    return data as Product
}

async fetchRelatedProductsById(id: number) {
    const { data, error } = await this.supabaseService
    .getClient()
    .from('related_products')
    .select('*')
    .eq('product_id', id)
    .order('id', {ascending: true});

    if (error) {
      console.error(error)
      return []
    }

    return data as RelatedProduct[]
  }

}
