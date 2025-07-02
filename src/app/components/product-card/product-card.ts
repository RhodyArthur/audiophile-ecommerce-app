import { Component, effect, inject, input, signal } from '@angular/core';
import { Button } from "../../shared/button/button";
import { Product, ProductImageSet } from '../../models/product';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-card',
  imports: [Button],
  templateUrl: './product-card.html',
  styleUrl: './product-card.sass'
})
export class ProductCard {
  product = input<Product>();
  productService = inject(ProductsService);
  productImages = signal<ProductImageSet[]>([]);
  productId = signal<number>(0);

  constructor() {
    effect(() => {

      this.getProductImages();
    }) 
  }
  
  async getProductImages() {
    if (this.product()) {
      this.productId.set(this.product()!.id)
      let images = await this.productService.fetchProductImagesById(this.productId());
      this.productImages.set(images);
    }
  }
}
