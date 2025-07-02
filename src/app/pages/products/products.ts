import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { Footer } from "../../components/footer/footer";
import { About } from "../../components/about/about";
import { HomeProducts } from "../../components/home-products/home-products";
import { ProductsCategory } from "../../components/products-category/products-category";
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-products',
  imports: [Footer, About, ProductsCategory, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.sass'
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  category = signal<string>('');
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

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
    let products = await this.productsService.fetchProductsByCategory(category)
    this.products.set(products)
  }
}
