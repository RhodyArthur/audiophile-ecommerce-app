import { Component, effect, inject, input, signal } from '@angular/core';
import { Button } from "../../shared/button/button";
import { Product, ProductImageSet } from '../../models/product';
import { ProductsService } from '../../services/products-service';
import { Router } from '@angular/router';
import { Spinner } from "../../shared/spinner/spinner";
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-card',
  imports: [Button, Spinner],
  templateUrl: './product-card.html',
  styleUrl: './product-card.sass'
})
export class ProductCard {
  product = input<Product>();
  productService = inject(ProductsService);
  router = inject(Router);
  productImages = signal<ProductImageSet[]>([]);
  productId = signal<number>(0);
  isLoading = signal<boolean>(false);
  private hotToastService = inject(HotToastService);

  
  constructor() {
    effect(() => {
      this.getProductImages();
    }) 
  }
  
  async getProductImages() {
    this.isLoading.set(true);

    try {
      if (this.product()) {
        this.productId.set(this.product()!.id)
        let images = await this.productService.fetchProductImagesById(this.productId());
        this.productImages.set(images);
      }
    }
    catch (err) {
      console.error('Failed to load products images', err);
      this.hotToastService.error('Failed to load products images')
    } finally {
      this.isLoading.set(false);
    }
  }

  handleButtonClicked(id: number) {
    this.router.navigate(['product-details', id])
  }
}
