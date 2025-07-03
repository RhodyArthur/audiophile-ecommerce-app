import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsCategory } from "../../components/products-category/products-category";
import { About } from "../../components/about/about";
import { Footer } from "../../components/footer/footer";
import { ItemCard } from "../../components/item-card/item-card";

@Component({
  selector: 'app-product-details',
  imports: [ProductsCategory, About, Footer, ItemCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.sass'
})
export class ProductDetails {

  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  productDetails = signal<Product | null>(null);
  productId = signal<number>(0);
  

  constructor() {
    effect(() => {
      this.loadFullProduct(this.productId())
    })

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {
        this.productId.set(Number(id))
      }
    })
  }

  private async loadFullProduct(id: number) {
    try {
      const full = await this.productService.fetchProductDetails(id);
      this.productDetails.set(full);
      // console.log('hello', full)
    } catch (err) {
      console.error('Failed loading product assets', err);
      this.productDetails.set(null);
    }
  }
}
