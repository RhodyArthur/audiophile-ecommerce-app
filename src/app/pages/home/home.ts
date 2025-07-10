import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { About } from "../../components/about/about";
import { HomeProducts } from "../../components/home-products/home-products";
import { ProductsCategory } from "../../components/products-category/products-category";

@Component({
  selector: 'app-home',
  imports: [Hero, About, HomeProducts, ProductsCategory],
  templateUrl: './home.html',
  styleUrl: './home.sass'
})
export class Home {

}
