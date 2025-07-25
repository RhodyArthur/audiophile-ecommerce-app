import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { Product, RelatedProduct } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsCategory } from "../../components/products-category/products-category";
import { About } from "../../components/about/about";
import { ItemCard } from "../../components/item-card/item-card";
import { Location } from '@angular/common';
import { Spinner } from "../../shared/spinner/spinner";
import { RelatedProductCard } from "../../components/related-product-card/related-product-card";
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-details',
  imports: [ProductsCategory, About, ItemCard, Spinner, RelatedProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.sass'
})
export class ProductDetails {

  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private hotToastService = inject(HotToastService);
  productDetails = signal<Product | null>(null);
  relatedProducts = signal<RelatedProduct[]>([]);
  isLoading = signal<boolean>(false);
  productSlug = signal<string>('');
  

  constructor() {
    effect(() => {
      this.loadFullProduct(this.productSlug())
    })

    this.route.paramMap.subscribe(params => {
      let slug = params.get('slug');

      if (slug) {
        this.productSlug.set(slug)
      }
    })
  }

  private async loadFullProduct(slug: string) {
    this.isLoading.set(true);

    try {
      const full = await this.productService.fetchProductDetails(slug);
      this.productDetails.set(full);
      this.loadRelatedProducts(full!.id)
    } catch (err) {
      console.error('Failed loading product assets', err);
      this.hotToastService.error('Failed loading product assets')
      this.productDetails.set(null);
    }
    finally {
      this.isLoading.set(false);
    }
  }

  private async loadRelatedProducts(id: number) {
    this.isLoading.set(true);
    try {
        const full = await this.productService.fetchRelatedProductsById(id);
        this.relatedProducts.set(full);
    } catch (err) {
      console.error('Failed loading related product assets', err);
      this.hotToastService.error('Failed loading related product assets')
      this.relatedProducts.set([]);
    }
    finally {
      this.isLoading.set(false);
    }
  }

  goBack() {
    this.location.back()
  }
}
