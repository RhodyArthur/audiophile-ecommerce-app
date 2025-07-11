import { Component, effect, inject, input } from '@angular/core';
import { Button } from "../../shared/button/button";
import { RelatedProduct } from '../../models/product';
import { ProductsService } from '../../services/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-product-card',
  imports: [Button],
  templateUrl: './related-product-card.html',
  styleUrl: './related-product-card.sass'
})
export class RelatedProductCard {
  relatedProduct = input<RelatedProduct>()
  private router = inject(Router);
  private productService = inject(ProductsService);


  async navigateToDetails(id: number) {
    try {
      const slug = await this.productService.getProductSlug(id);
      console.log(slug)

      if (slug) {
        // Navigate to route based on slug
        this.router.navigate(['/product-details', slug]);
      } else {
        console.error('Product slug not found');
        // Optionally show user-friendly message
      }
    } catch (err) {
      console.error('Failed to navigate to product details:', err);
      // Optionally show toast or alert
    }
    
  }


}
