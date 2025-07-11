import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { About } from "../../components/about/about";
import { ProductsCategory } from "../../components/products-category/products-category";
import { ProductCard } from "../../components/product-card/product-card";
import { Spinner } from "../../shared/spinner/spinner";
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-products',
  imports: [About, ProductsCategory, ProductCard, Spinner],
  templateUrl: './products.html',
  styleUrl: './products.sass'
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  category = signal<string>('');
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private hotToastService = inject(HotToastService);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let category = params.get('category');

      if (category) {
        this.category.set(category)
        this.categoryProducts(this.category())
      }
    })
  }


  async categoryProducts(category: string) {
    this.isLoading.set(true);

    try {
      let products = await this.productsService.fetchProductsByCategory(category)
      this.products.set(products.reverse())
    }
    catch (err) {
      console.error('Failed to load products', err);
      this.errorMessage.set('Failed to load products');
      this.hotToastService.error(this.errorMessage())
    } finally {
      this.isLoading.set(false);
    }
  }
}
