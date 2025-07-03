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


  navigateToDetails(id: number) {
    this.router.navigate(['product-details', id])
  }

}
