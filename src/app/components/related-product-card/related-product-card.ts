import { Component, input } from '@angular/core';
import { Button } from "../../shared/button/button";
import { RelatedProduct } from '../../models/product';

@Component({
  selector: 'app-related-product-card',
  imports: [Button],
  templateUrl: './related-product-card.html',
  styleUrl: './related-product-card.sass'
})
export class RelatedProductCard {
  relatedProduct = input<RelatedProduct>()
}
