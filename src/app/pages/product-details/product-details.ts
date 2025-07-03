import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { Product, RelatedProduct } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsCategory } from "../../components/products-category/products-category";
import { About } from "../../components/about/about";
import { Footer } from "../../components/footer/footer";
import { ItemCard } from "../../components/item-card/item-card";
import { Location } from '@angular/common';
import { Spinner } from "../../shared/spinner/spinner";
import { RelatedProductCard } from "../../components/related-product-card/related-product-card";

@Component({
  selector: 'app-product-details',
  imports: [ProductsCategory, About, Footer, ItemCard, Spinner, RelatedProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.sass'
})
export class ProductDetails {

  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  productDetails = signal<Product | null>(null);
  relatedProducts = signal<RelatedProduct[]>([]);
  productId = signal<number>(0);
  isLoading = signal<boolean>(false);
  

  constructor() {
    effect(() => {
      this.loadFullProduct(this.productId())
      this.loadRelatedProducts(this.productId())
    })

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {
        this.productId.set(Number(id))
      }
    })
  }

  private async loadFullProduct(id: number) {
    this.isLoading.set(true);

    try {
      const full = await this.productService.fetchProductDetails(id);
      this.productDetails.set(full);
    } catch (err) {
      console.error('Failed loading product assets', err);
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
      console.error('Failed loading product assets', err);
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
